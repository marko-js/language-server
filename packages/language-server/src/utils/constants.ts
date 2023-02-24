import type { Location, Position } from "htmljs-parser";

export const START_POSITION: Position = {
  line: 0,
  character: 0,
};

export const START_LOCATION: Location = {
  start: START_POSITION,
  end: START_POSITION,
};
