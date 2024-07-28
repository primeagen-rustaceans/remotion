import type {ChromiumOptions, LogLevel, openBrowser} from '@remotion/renderer';
import {RenderInternals} from '@remotion/renderer';
import {VERSION} from 'remotion/version';
import type {Await} from './await';
import type {ProviderSpecifics} from './provider-implementation';
import type {CloudProvider} from './still';

type LaunchedBrowser = {
	instance: Await<ReturnType<typeof openBrowser>>;
	configurationString: string;
};

const makeConfigurationString = (
	options: ChromiumOptions,
	logLevel: LogLevel,
): string => {
	return [
		`web-security-${Boolean(options.disableWebSecurity)}`,
		`multi-process-${Boolean(options.enableMultiProcessOnLinux)}`,
		`ignore-certificate-errors-${Boolean(options.ignoreCertificateErrors)}`,
		`log-level-${logLevel}`,
		`gl-${options.gl ?? null}`,
		`userAgent-${options.userAgent ?? null}`,
		`headless-${options.headless ?? false}`,
	].join('/');
};

let _browserInstance: LaunchedBrowser | null;

let launching = false;

const waitForLaunched = () => {
	return new Promise<void>((resolve, reject) => {
		const check = () =>
			setTimeout(() => {
				if (launching) {
					check();
				} else {
					resolve();
				}
			}, 16);

		setTimeout(() => reject(new Error('Timeout launching browser')), 5000);
		check();
	});
};

export const forgetBrowserEventLoop = (logLevel: LogLevel) => {
	RenderInternals.Log.info(
		{indent: false, logLevel},
		'Keeping browser open for next invocation',
	);
	_browserInstance?.instance.forgetEventLoop();
};

export const getBrowserInstance = async <
	Provider extends CloudProvider,
	Region extends string,
>({
	logLevel,
	indent,
	chromiumOptions,
	providerSpecifics,
}: {
	logLevel: LogLevel;
	indent: boolean;
	chromiumOptions: ChromiumOptions;
	providerSpecifics: ProviderSpecifics<Provider, Region>;
}): Promise<LaunchedBrowser> => {
	const actualChromiumOptions: ChromiumOptions = {
		...chromiumOptions,
		// Override the `null` value, which might come from CLI with swANGLE
		gl: chromiumOptions.gl ?? 'swangle',
		enableMultiProcessOnLinux: false,
	};
	const configurationString = makeConfigurationString(
		actualChromiumOptions,
		logLevel,
	);
	RenderInternals.Log.info(
		{indent: false, logLevel},
		`Rendering with Remotion v${VERSION}.`,
	);

	if (launching) {
		RenderInternals.Log.info(
			{indent: false, logLevel},
			'Already waiting for browser launch...',
		);
		await waitForLaunched();
		if (!_browserInstance) {
			throw new Error('expected to launch');
		}
	}

	if (!_browserInstance) {
		RenderInternals.Log.info(
			{indent: false, logLevel},
			'Cold function, launching new browser instance',
		);
		launching = true;

		const execPath = providerSpecifics.getChromiumPath();

		const instance = await RenderInternals.internalOpenBrowser({
			browser: 'chrome',
			browserExecutable: execPath,
			chromiumOptions: actualChromiumOptions,
			forceDeviceScaleFactor: undefined,
			indent: false,
			viewport: null,
			logLevel,
			onBrowserDownload: () => {
				throw new Error('Should not download a browser in serverless');
			},
		});
		instance.on('disconnected', () => {
			RenderInternals.Log.info(
				{indent: false, logLevel},
				'Browser disconnected or crashed.',
			);
			forgetBrowserEventLoop(logLevel);
			_browserInstance?.instance?.close(true, logLevel, indent).catch((err) => {
				RenderInternals.Log.info(
					{indent: false, logLevel},
					'Could not close browser instance',
					err,
				);
			});
			_browserInstance = null;
		});
		_browserInstance = {
			instance,
			configurationString,
		};

		launching = false;
		return _browserInstance;
	}

	if (_browserInstance.configurationString !== configurationString) {
		RenderInternals.Log.info(
			{indent: false, logLevel},
			'Warm function, but Browser configuration changed. Killing old browser instance.',
		);
		_browserInstance.instance.rememberEventLoop();
		await _browserInstance.instance.close(true, logLevel, indent);
		_browserInstance = null;
		return getBrowserInstance({
			logLevel,
			indent,
			chromiumOptions,
			providerSpecifics,
		});
	}

	RenderInternals.Log.info(
		{indent: false, logLevel},
		'Warm function, reusing browser instance',
	);
	_browserInstance.instance.rememberEventLoop();
	return _browserInstance;
};
