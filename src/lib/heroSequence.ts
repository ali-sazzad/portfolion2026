import type { IProject } from "@theatre/core";

/**
 * Theatre.js timeline for the hero blob, authored as data.
 * Each track is a list of [seconds, value] keyframes with eased bezier handles.
 * Swap this for an exported studio save file to edit visually.
 */
export const SEQUENCE_LENGTH = 3.4;

type Track = [number, number][];

const tracks: Record<string, Track> = {
  scale: [[0, 0.05], [1.5, 1.22], [2.4, 0.92], [3.4, 1]],
  distort: [[0, 1.5], [1.4, 0.95], [3.4, 0.38]],
  spin: [[0, -2.4], [3.4, 0.6]],
  x: [[0, 0], [2.0, 0.55], [3.4, 0.5]],
  y: [[0, -0.6], [1.6, 0.18], [3.4, 0]],
  glow: [[0, 0], [1.2, 0.2], [2.6, 1], [3.4, 0.7]],
};

export const heroState = (() => {
  const trackIdByPropPath: Record<string, string> = {};
  const trackData: Record<string, unknown> = {};

  for (const [prop, frames] of Object.entries(tracks)) {
    const id = `track-${prop}`;
    trackIdByPropPath[JSON.stringify([prop])] = id;
    trackData[id] = {
      type: "BasicKeyframedTrack",
      __debugName: `Blob:${prop}`,
      keyframes: frames.map(([position, value], i) => ({
        id: `${prop}-${i}`,
        position,
        value,
        connectedRight: true,
        handles: [0.4, 0.9, 0.45, 0.05],
      })),
    };
  }

  return {
    sheetsById: {
      Hero: {
        staticOverrides: { byObject: {} },
        sequence: {
          type: "PositionalSequence",
          length: SEQUENCE_LENGTH,
          subUnitsPerUnit: 30,
          tracksByObject: { Blob: { trackIdByPropPath, trackData } },
        },
      },
    },
    definitionVersion: "0.4.0",
    revisionHistory: [],
  };
})();

export type BlobValues = {
  scale: number;
  distort: number;
  spin: number;
  x: number;
  y: number;
  glow: number;
};

type HeroSheet = { project: IProject; sheet: ReturnType<IProject["sheet"]> };
let cached: Promise<HeroSheet> | undefined;

/** Theatre allows one project per id, so share it across remounts. */
export function createHeroSheet(): Promise<HeroSheet> {
  cached ??= import("@theatre/core").then(({ getProject }) => {
    const project = getProject("AayoCreations Portfolio", {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state: heroState as any,
    });
    return { project, sheet: project.sheet("Hero") };
  });
  return cached;
}
