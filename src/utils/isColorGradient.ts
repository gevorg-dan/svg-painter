import { identity, memoizeWith } from "ramda";

export const isColorGradient = memoizeWith(
  identity,
  (value: string) =>
    !!/linear-gradient\(([^)]+)\)/.exec(value) ||
    !!/radial-gradient\(([^)]+)\)/.exec(value) ||
    !!/repeating-linear-gradient\(([^)]+)\)/.exec(value) ||
    !!/repeating-radial-gradient\(([^)]+)\)/.exec(value)
);
