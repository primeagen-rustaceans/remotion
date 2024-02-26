import execa from "execa";
import fs from "fs";
import os from "os";
import path from "path";
import sharp from "sharp";
import { random } from "remotion";
import { expect, test } from "vitest";
import { RenderInternals } from "@remotion/renderer";

function selectColor(color: string, frame: number) {
  return Math.floor((random(`${color}-${frame}`) * 255) % 255);
}

const getMissedFramesforCodec = async () => {
  const outputDir = await fs.promises.mkdtemp(
    path.join(os.tmpdir(), "remotion-")
  );
  const outputPath = path.join(outputDir, "vid.gif");

  // render the VideoTesting example (which contains the Framer composition embedded with <Video>) to an image
  // sequence which can be checked for accuracy
  await execa(
    "pnpm",
    [
      "exec",
      "remotion",
      "render",
      `video-testing-mp4-offthread`,
      "--codec=gif",
      "--every-nth-frame=2",
      outputPath,
    ],
    {
      cwd: path.join(process.cwd(), "..", "example"),
    }
  );

  await RenderInternals.callFf({
    bin: "ffmpeg",
    args: [
      "-i",
      outputPath,
      "-f",
      "image2",
      path.join(outputDir, "out%2d.jpeg"),
      "-y",
    ],
    indent: false,
    logLevel: "info",
    binariesDirectory: null,
  });

  let missedFrames = 0;

  for (let frame = 0; frame < 50; frame++) {
    // each frame of the embedded video contains a (deterministically) random color which should appear correctly
    // in the rendered output
    const expectedColor = {
      red: selectColor("red", frame * 2),
      green: selectColor("green", frame * 2),
      blue: selectColor("blue", frame * 2),
    };

    // extract the actual RGB color value of the top left pixel in the frame image that was generated by remotion
    const paddedIndex = String(frame + 1).padStart(2, "0");
    const filename = path.join(outputDir, `out${paddedIndex}.jpeg`);
    const img = await sharp(filename).raw().toBuffer();

    const actualColor = {
      red: img.readUInt8(0),
      green: img.readUInt8(1),
      blue: img.readUInt8(2),
    };

    const colorDistance = {
      red: Math.abs(expectedColor.red - actualColor.red),
      green: Math.abs(expectedColor.green - actualColor.green),
      blue: Math.abs(expectedColor.blue - actualColor.blue),
    };

    // encoding sometimes shifts the color slightly - so measure the distance between the expected and actual
    // colors and consider any frame not within an acceptable range to be wrong
    const highestDistance = Math.max(
      colorDistance.red,
      colorDistance.blue,
      colorDistance.green
    );
    const threshold = 70;
    if (highestDistance > threshold) {
      missedFrames++;
    }
  }

  RenderInternals.deleteDirectory(outputDir);
  return missedFrames;
};

test(
  "should render correct frames from embedded videos - MP4 offthread",
  async () => {
    const missedFrames = await getMissedFramesforCodec();
    expect(missedFrames).toBe(0);
  },
  {
    retry: 2,
  }
);
