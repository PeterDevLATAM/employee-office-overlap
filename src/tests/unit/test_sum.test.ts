import type * as TestFuncitons from "../../index";

const { sum } = jest.requireActual<typeof TestFuncitons>("../../index.ts");

const successCases = [
  {
    id: 0,
    input: { a: 1, b: 1 },
    output: 2,
  },
  {
    id: 1,
    input: { a: 1, b: 2 },
    output: 3,
  },
  {
    id: 2,
    input: { a: 2, b: 1 },
    output: 3,
  },
  {
    id: 3,
    input: { a: 2, b: 2 },
    output: 4,
  },
];

describe("Test sum function", () => {
  it.each(successCases)("success case $id", ({ input, output }) => {
    const { a, b } = input;
    expect(sum(a, b)).toBe(output);
  });
});
