import type {VideoTrack} from '@remotion/media-parser';
import type {ConvertMediaVideoCodec} from './codec-id';
import type {ConvertMediaOnVideoFrame} from './convert-media';
import {convertToCorrectVideoFrame} from './convert-to-correct-videoframe';
import type {WebCodecsVideoEncoder} from './video-encoder';

export const onFrame = async ({
	frame,
	onVideoFrame,
	videoEncoder,
	track,
	outputCodec,
}: {
	frame: VideoFrame;
	onVideoFrame: ConvertMediaOnVideoFrame | null;
	videoEncoder: WebCodecsVideoEncoder;
	track: VideoTrack;
	outputCodec: ConvertMediaVideoCodec;
}) => {
	const newFrame = onVideoFrame ? await onVideoFrame({frame, track}) : frame;

	if (newFrame.codedHeight !== frame.displayHeight) {
		throw new Error(
			`Returned VideoFrame of track ${track.trackId} has different codedHeight (${newFrame.codedHeight}) than the input frame displayHeight (${frame.displayHeight})`,
		);
	}

	if (newFrame.codedWidth !== frame.displayWidth) {
		throw new Error(
			`Returned VideoFrame of track ${track.trackId} has different codedWidth (${newFrame.codedWidth}) than the input frame displayWidth (${frame.displayWidth})`,
		);
	}

	if (newFrame.displayWidth !== frame.displayWidth) {
		throw new Error(
			`Returned VideoFrame of track ${track.trackId} has different displayWidth (${newFrame.displayWidth}) than the input frame (${newFrame.displayHeight})`,
		);
	}

	if (newFrame.displayHeight !== frame.displayHeight) {
		throw new Error(
			`Returned VideoFrame of track ${track.trackId} has different displayHeight (${newFrame.displayHeight}) than the input frame (${newFrame.displayHeight})`,
		);
	}

	if (newFrame.timestamp !== frame.timestamp) {
		throw new Error(
			`Returned VideoFrame of track ${track.trackId} has different timestamp (${newFrame.timestamp}) than the input frame (${newFrame.timestamp}). When calling new VideoFrame(), pass {timestamp: frame.timestamp} as second argument`,
		);
	}

	if (newFrame.duration !== frame.duration) {
		throw new Error(
			`Returned VideoFrame of track ${track.trackId} has different duration (${newFrame.duration}) than the input frame (${newFrame.duration}). When calling new VideoFrame(), pass {duration: frame.duration} as second argument`,
		);
	}

	const fixedFrame = convertToCorrectVideoFrame({
		videoFrame: newFrame,
		outputCodec,
	});

	await videoEncoder.encodeFrame(fixedFrame, fixedFrame.timestamp);

	fixedFrame.close();
	if (frame !== newFrame) {
		frame.close();
	}

	if (fixedFrame !== newFrame) {
		fixedFrame.close();
	}
};
