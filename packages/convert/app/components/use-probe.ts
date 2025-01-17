import {
	Dimensions,
	LogLevel,
	MediaParserAudioCodec,
	MediaParserVideoCodec,
	MetadataEntry,
	parseMedia,
	ParseMediaContainer,
	ParseMediaOnProgress,
	TracksField,
} from '@remotion/media-parser';
import {fetchReader} from '@remotion/media-parser/fetch';
import {webFileReader} from '@remotion/media-parser/web-file';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {Source} from '~/lib/convert-state';

export type ProbeResult = ReturnType<typeof useProbe>;

export const useThumbnail = ({
	src,
	logLevel,
	onVideoThumbnail,
}: {
	src: Source;
	logLevel: LogLevel;
	onVideoThumbnail: (videoFrame: VideoFrame) => void;
}) => {
	const abortController = new AbortController();
	parseMedia({
		signal: abortController.signal,
		reader: src.type === 'file' ? webFileReader : fetchReader,
		src: src.type === 'file' ? src.file : src.url,
		logLevel,
		onVideoTrack: async (track) => {
			if (typeof VideoDecoder === 'undefined') {
				return null;
			}

			let frames = 0;

			const decoder = new VideoDecoder({
				error: (error) => {
					// eslint-disable-next-line no-console
					console.log(error);
				},
				output(frame) {
					onVideoThumbnail(frame);
					frame.close();
				},
			});

			if (!(await VideoDecoder.isConfigSupported(track)).supported) {
				return null;
			}

			// TODO: See if possible
			decoder.configure(track);
			return (sample) => {
				frames++;
				if (frames >= 30) {
					abortController.abort();
				}

				decoder.decode(new EncodedVideoChunk(sample));
			};
		},
	}).catch((err) => {
		if ((err as Error).stack?.includes('Cancelled')) {
			return;
		}
		if ((err as Error).stack?.toLowerCase()?.includes('aborted')) {
			return;
		}
		// firefox
		if ((err as Error).message?.toLowerCase()?.includes('aborted')) {
			return;
		}

		// eslint-disable-next-line no-console
		console.log(err);
	});
};

export const useProbe = ({
	src,
	logLevel,
	onProgress,
}: {
	src: Source;
	logLevel: LogLevel;
	onProgress: ParseMediaOnProgress;
}) => {
	const [audioCodec, setAudioCodec] = useState<
		MediaParserAudioCodec | null | undefined
	>(undefined);
	const [fps, setFps] = useState<number | null | undefined>(undefined);
	const [isHdr, setHdr] = useState<boolean | undefined>(undefined);
	const [durationInSeconds, setDurationInSeconds] = useState<
		number | null | undefined
	>(undefined);
	const [dimensions, setDimensions] = useState<Dimensions | null>(null);
	const [name, setName] = useState<string | null>(null);
	const [videoCodec, setVideoCodec] = useState<MediaParserVideoCodec | null>(
		null,
	);
	const [rotation, setRotation] = useState<number | null>(null);
	const [size, setSize] = useState<number | null>(null);
	const [metadata, setMetadata] = useState<MetadataEntry[] | null>(null);
	const [tracks, setTracks] = useState<TracksField | null>(null);
	const [container, setContainer] = useState<ParseMediaContainer | null>(null);
	const [done, setDone] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const getStart = useCallback(() => {
		const controller = new AbortController();
		parseMedia({
			logLevel,
			src: src.type === 'file' ? src.file : src.url,
			fields: {
				dimensions: true,
				videoCodec: true,
				size: true,
				durationInSeconds: true,
				audioCodec: true,
				fps: true,
				name: true,
				tracks: true,
				container: true,
				isHdr: true,
				rotation: true,
				metadata: true,
			},
			onParseProgress: onProgress,
			reader: src.type === 'file' ? webFileReader : fetchReader,
			signal: controller.signal,
			onMetadata: (metadata) => {
				setMetadata(metadata);
			},
			onContainer(c) {
				setContainer(c);
			},
			onAudioCodec: (codec) => {
				setAudioCodec(codec);
			},
			onFps: (f) => {
				setFps(f);
			},
			onIsHdr: (hdr) => {
				setHdr(hdr);
			},
			onDurationInSeconds: (d) => {
				setDurationInSeconds(d);
			},
			onRotation(rotation) {
				setRotation(rotation);
			},
			onName: (n) => {
				setName(n);
			},
			onDimensions(dim) {
				setDimensions(dim);
			},
			onVideoCodec: (codec) => {
				setVideoCodec(codec);
			},
			onTracks: (trx) => {
				setTracks(trx);
			},
			onSize(s) {
				setSize(s);
			},
		})
			.then(() => {})
			.catch((err) => {
				if ((err as Error).stack?.includes('Cancelled')) {
					return;
				}
				if ((err as Error).stack?.toLowerCase()?.includes('aborted')) {
					return;
				}
				// firefox
				if ((err as Error).message?.toLowerCase()?.includes('aborted')) {
					return;
				}

				setError(err as Error);
				// eslint-disable-next-line no-console
				console.log(err);
			})
			.finally(() => {
				setDone(true);
			});

		return controller;
	}, [src, logLevel, onProgress]);

	useEffect(() => {
		const start = getStart();
		return () => {
			start.abort(new Error('Cancelled (strict mode)'));
		};
	}, [getStart]);

	return useMemo(() => {
		return {
			tracks,
			audioCodec,
			fps,
			name,
			container,
			dimensions,
			videoCodec,
			size,
			durationInSeconds,
			isHdr,
			done,
			error,
			rotation,
			metadata,
		};
	}, [
		audioCodec,
		container,
		dimensions,
		fps,
		name,
		size,
		tracks,
		videoCodec,
		durationInSeconds,
		done,
		error,
		isHdr,
		rotation,
		metadata,
	]);
};
