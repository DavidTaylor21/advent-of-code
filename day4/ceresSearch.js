import { requestInputData } from "../api.js";

const checkHorizontally = (x, y, wordSearch) => {
  const cols = wordSearch[0].length;
  let wordsFound = 0;
  if (
    y + 3 < cols &&
    wordSearch[x][y + 1] === "M" &&
    wordSearch[x][y + 2] === "A" &&
    wordSearch[x][y + 3] === "S"
  ) {
    wordsFound++;
  }
  if (
    y - 3 >= 0 &&
    wordSearch[x][y - 1] === "M" &&
    wordSearch[x][y - 2] === "A" &&
    wordSearch[x][y - 3] === "S"
  ) {
    wordsFound++;
  }
  return wordsFound;
};

const checkVertically = (x, y, wordSearch) => {
  const rows = wordSearch.length;
  let wordsFound = 0;

  if (
    x + 3 < rows &&
    wordSearch[x + 1][y] === "M" &&
    wordSearch[x + 2][y] === "A" &&
    wordSearch[x + 3][y] === "S"
  ) {
    wordsFound++;
  }
  if (
    x - 3 >= 0 &&
    wordSearch[x - 1][y] === "M" &&
    wordSearch[x - 2][y] === "A" &&
    wordSearch[x - 3][y] === "S"
  ) {
    wordsFound++;
  }
  return wordsFound;
};

const checkDiagonally = (x, y, wordSearch) => {
  const rows = wordSearch.length;
  const cols = wordSearch[0].length;
  let wordsFound = 0;

  if (
    x + 3 < rows &&
    y + 3 < cols &&
    wordSearch[x + 1][y + 1] === "M" &&
    wordSearch[x + 2][y + 2] === "A" &&
    wordSearch[x + 3][y + 3] === "S"
  ) {
    wordsFound++;
  }
  if (
    x - 3 >= 0 &&
    y - 3 >= 0 &&
    wordSearch[x - 1][y - 1] === "M" &&
    wordSearch[x - 2][y - 2] === "A" &&
    wordSearch[x - 3][y - 3] === "S"
  ) {
    wordsFound++;
  }
  if (
    x + 3 < rows &&
    y - 3 >= 0 &&
    wordSearch[x + 1][y - 1] === "M" &&
    wordSearch[x + 2][y - 2] === "A" &&
    wordSearch[x + 3][y - 3] === "S"
  ) {
    wordsFound++;
  }
  if (
    x - 3 >= 0 &&
    y + 3 < cols &&
    wordSearch[x - 1][y + 1] === "M" &&
    wordSearch[x - 2][y + 2] === "A" &&
    wordSearch[x - 3][y + 3] === "S"
  ) {
    wordsFound++;
  }
  return wordsFound;
};
const checkMas = (x, y, wordSearch) => {
  let masFound = 0;
  const rows = wordSearch.length;
  const cols = wordSearch[0].length;
  if (
    x + 2 < rows &&
    y + 2 < cols &&
    wordSearch[x][y] === "M" &&
    wordSearch[x + 1][y + 1] === "A" &&
    wordSearch[x + 2][y + 2] === "S" &&
    wordSearch[x + 2][y] === "M" &&
    wordSearch[x][y + 2] === "S"
  ) {
    masFound++;
  }
  if (
    x + 2 < rows &&
    y + 2 < cols &&
    wordSearch[x][y] === "M" &&
    wordSearch[x + 1][y + 1] === "A" &&
    wordSearch[x + 2][y + 2] === "S" &&
    wordSearch[x + 2][y] === "S" &&
    wordSearch[x][y + 2] === "M"
  ) {
    masFound++;
  }
  if (
    x + 2 < rows &&
    y + 2 < cols &&
    wordSearch[x][y] === "S" &&
    wordSearch[x + 1][y + 1] === "A" &&
    wordSearch[x + 2][y + 2] === "M" &&
    wordSearch[x + 2][y] === "S" &&
    wordSearch[x][y + 2] === "M"
  ) {
    masFound++;
  }
  if (
    x + 2 < rows &&
    y + 2 < cols &&
    wordSearch[x][y] === "S" &&
    wordSearch[x + 1][y + 1] === "A" &&
    wordSearch[x + 2][y + 2] === "M" &&
    wordSearch[x + 2][y] === "M" &&
    wordSearch[x][y + 2] === "S"
  ) {
    masFound++;
  }
  return masFound;
};

requestInputData(4).then((inputData) => {
  const inputDataRows = inputData.split("\n");
  const wordSearch = inputDataRows.map((row) => row.split(""));

  let xmasFound = 0;
  let masFound = 0;

  for (let i = 0; i < wordSearch.length; i++) {
    for (let j = 0; j < wordSearch[0].length; j++) {
      masFound += checkMas(i, j, wordSearch);
      if (wordSearch[i][j] === "X") {
        xmasFound += checkHorizontally(i, j, wordSearch);
        xmasFound += checkVertically(i, j, wordSearch);
        xmasFound += checkDiagonally(i, j, wordSearch);
      }
    }
  }
  console.log("xmas count: ", xmasFound);
  console.log("x-mas found: ", masFound);
});
const testWordSearch = [
  "MMMSXXMASM",
  "MSAMXMSMSA",
  "AMXSXMAAMM",
  "MSAMASMSMX",
  "XMASAMXAMM",
  "XXAMMXXAMA",
  "SMSMSASXSS",
  "SAXAMASAAA",
  "MAMMMXMMMM",
  "MXMXAXMASX",
].map((row) => row.split(""));

let testCount = 0;
for (let i = 0; i < testWordSearch.length; i++) {
  for (let j = 0; j < testWordSearch[0].length; j++) {
    if (testWordSearch[i][j] === "X") {
      testCount += checkHorizontally(i, j, testWordSearch);
      testCount += checkVertically(i, j, testWordSearch);
      testCount += checkDiagonally(i, j, testWordSearch);
    }
  }
}
console.log("test xmas count: ", testCount);

const testMasSearch = [
  ["M", "A", "S"],
  ["M", "A", "S"],
  ["M", "A", "S"],
];
let testMasCount = 0;
for (let i = 0; i < testMasSearch.length; i++) {
  for (let j = 0; j < testMasSearch[0].length; j++) {
    testMasCount += checkMas(i, j, testMasSearch);
  }
}
console.log("test x-mas count: ", testMasCount);
