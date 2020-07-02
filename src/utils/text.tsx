const EX = "X";

/*
 * Simulate the shape of an English sentence.
 *
 * The returned sentence will have exactly charLength characters,
 * including spaces.
 */
export function genSentence(
  charLength: number,
  {
    // Normal words are a bit longer.
    genNormalWord = () => EX.repeat(Math.round(Math.random() * 5) + 3),
    // Stopwords are a bit shorter.
    genStopWord = () => EX.repeat(Math.round(Math.random() * 2) + 1),
  }: {
    genNormalWord?: () => string;
    genStopWord?: () => string;
  } = {}
): string {
  let sentence = "";

  while (sentence.length < charLength) {
    let word;
    if (Math.random() * 100 <= 75) {
      // Most of the time, simulate a more common stopword such
      // as I, me, a, and, it, is, or...
      word = genStopWord();
    } else {
      // For the rest of the time, simulate a regular word.
      word = genNormalWord();
    }

    // This builds the sentence backwards just to avoid adding an
    // initial space.
    sentence = `${word} ${sentence}`;
  }

  if (sentence.length > charLength) {
    sentence = sentence.substring(0, charLength);
  }

  return sentence;
}
