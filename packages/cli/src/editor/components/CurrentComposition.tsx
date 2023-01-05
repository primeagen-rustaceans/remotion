import type {LogLevel} from '@remotion/renderer';
import React, {useCallback, useContext, useEffect} from 'react';
import {Internals} from 'remotion';
import {getDefaultOutLocation} from '../../get-default-out-name';
import {BACKGROUND, BORDER_COLOR} from '../helpers/colors';
import {isCompositionStill} from '../helpers/is-composition-still';
import {useKeybinding} from '../helpers/use-keybinding';
import {ModalsContext} from '../state/modals';
import {renderFrame} from '../state/render-frame';
import {RichTimelineContext} from '../state/rich-timeline';
import {Spacing} from './layout';
import {Thumbnail} from './Thumbnail';

const container: React.CSSProperties = {
	minHeight: 70,
	display: 'block',
	borderBottom: `1px solid ${BORDER_COLOR}`,
	padding: 12,
	color: 'white',
	backgroundColor: BACKGROUND,
};

const title: React.CSSProperties = {
	fontWeight: 'bold',
	fontSize: 12,
	whiteSpace: 'nowrap',
	lineHeight: '18px',
	backgroundColor: BACKGROUND,
};

const subtitle: React.CSSProperties = {
	fontSize: 12,
	opacity: 0.8,
	whiteSpace: 'nowrap',
	lineHeight: '18px',
	backgroundColor: BACKGROUND,
};

const row: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
	lineHeight: '18px',
	backgroundColor: BACKGROUND,
};

const targetHeight = 60;
const targetWidth = (targetHeight * 16) / 9;

export const CurrentComposition = () => {
	const richTimelineContext = useContext(RichTimelineContext);
	const video = Internals.useVideo();
	const keybindings = useKeybinding();
	const {setSelectedModal} = useContext(ModalsContext);

	useEffect(() => {
		if (!video) {
			document.title = 'Remotion Preview';
			return;
		}

		document.title = `${video.id} / ${window.remotion_projectName} - Remotion Preview`;
	}, [video]);

	const renderStill = useCallback(() => {
		if (!video) {
			return null;
		}

		setSelectedModal({
			type: 'render',
			compositionId: video.id,
			initialFrame: 0,
			// TODO: Default PNG for stills, JPEG for videos
			initialImageFormat: 'png',
			initialQuality: window.remotion_renderDefaults?.quality ?? 80,
			initialScale: window.remotion_renderDefaults?.scale ?? 1,
			initialVerbose:
				(window.remotion_renderDefaults?.logLevel as LogLevel) === 'verbose',
			initialOutName: getDefaultOutLocation({
				compositionName: video.id,
				// TODO: Default PNG for stills, JPEG for videos
				defaultExtension: 'png',
			}),
			initialRenderType: 'video',
		});
	}, [setSelectedModal, video]);

	useEffect(() => {
		const binding = keybindings.registerKeybinding({
			event: 'keydown',
			key: 'r',
			commandCtrlKey: false,
			callback: renderStill,
			preventDefault: true,
		});

		return () => {
			binding.unregister();
		};
	}, [keybindings, renderStill]);

	if (!video) {
		return <div style={container} />;
	}

	const frameToDisplay = Math.floor(video.durationInFrames / 2);
	return (
		<div style={container}>
			<div style={row}>
				{richTimelineContext.richTimeline ? (
					<>
						<Thumbnail
							composition={video}
							targetHeight={targetHeight}
							targetWidth={targetWidth}
							frameToDisplay={frameToDisplay}
						/>
						<Spacing x={1} />
					</>
				) : null}
				<div>
					<div style={title}>{video.id}</div>
					<div style={subtitle}>
						{video.width}x{video.height}
						{isCompositionStill(video) ? null : `, ${video.fps} FPS`}
					</div>
					{isCompositionStill(video) ? (
						<div style={subtitle}>Still</div>
					) : (
						<div style={subtitle}>
							Duration {renderFrame(video.durationInFrames, video.fps)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
