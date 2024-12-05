import { requestInputData } from "../api.js";

requestInputData(1).then((inputData) => {
  const inputRows = inputData.split("\n");

  const firstColumn = [];
  const secondColumn = [];

  const splitInputs = inputRows.map((inputs) => {
    return inputs.split(/\s+/);
  });

  splitInputs.forEach((input) => {
    firstColumn.push(parseInt(input[0], 10));
    secondColumn.push(parseInt(input[1], 10));
  });

  firstColumn.sort((a, b) => a - b);
  secondColumn.sort((a, b) => a - b);

  let totalDistance = 0;
  let similarityScore = 0

  for (let i = 0; i < firstColumn.length - 1; i++) {

    totalDistance += Math.abs(firstColumn[i] - secondColumn[i]);

    const similarValues = secondColumn.filter((secondColumnValue)=>{return secondColumnValue === firstColumn[i]})
    
    similarityScore += firstColumn[i] * similarValues.length

  }

  console.log("total distance: ", totalDistance);
  console.log("similarity score", similarityScore)
});

