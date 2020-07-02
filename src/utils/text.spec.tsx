import { genSentence } from "./text";

describe(__filename, () => {
  it("generates a sentence", () => {
    const length = 10;
    const word = "X";
    expect(
      genSentence(length, {
        // These values will not require length normalization.
        genNormalWord: () => word,
        genStopWord: () => word,
      })
    ).toHaveLength(length);
  });

  it("truncates to the correct length", () => {
    const length = 26;
    const word = "XXXXX";
    expect(
      genSentence(length, {
        genNormalWord: () => word,
        genStopWord: () => word,
      })
    ).toHaveLength(length);
  });
});
