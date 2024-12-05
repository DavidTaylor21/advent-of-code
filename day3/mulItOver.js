import { requestInputData } from "../api.js";

requestInputData(3).then((inputData) => {
  const matches = inputData.match(/mul\(\d{1,3},\d{1,3}\)/g);
  const numberPairs = matches.map((match) => {
    return match.match(/\d{1,3}/g);
  });
  let result = 0;
  numberPairs.forEach((numberPair) => {
    result += parseInt(numberPair[0]) * parseInt(numberPair[1]);
  });
  console.log("result: ", result);
  const matchesWithConditionals = inputData.match(
    /(do\(\))|(don't\(\))|(mul\(\d{1,3},\d{1,3}\))/g
  );
 
  const numbersAndInstructions = matchesWithConditionals.map((matches) => {
    return matches.match(/\b(do)\b|\b(don't)\b|\b(\d{1,3})\b/g);
  });
 
  let doMultiplication = true;
  let resultwithInstructions = 0;
  numbersAndInstructions.forEach((pair) => {
    if (pair.includes("do")) {
      doMultiplication = true;
    } else if (pair.includes("don't")) {
      doMultiplication = false;
    } else if (doMultiplication === true) {
      resultwithInstructions += parseInt(pair[0]) * parseInt(pair[1]);
    }
  });
  console.log("result with instructions: ", resultwithInstructions);
});
