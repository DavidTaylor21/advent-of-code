import { requestInputData } from "../api.js";

const formatInput = (input) => {
    const rows = input.trim().split("\n").map((row) => {
        const splitRow = row.split(": ");
        const intsArr = splitRow[1].split(" ");
        const outputObj = {
            total: splitRow[0],
            integers: intsArr,
        };
        return outputObj;
    });
    return rows;
};

requestInputData(7).then((inputData) => {
    const formattedInput = formatInput(inputData);

    const operators = ['+', '*', '||']; 

    function generateOperatorCombinations(length) {
        if (length === 0) return [[]]; 
        const smallerCombos = generateOperatorCombinations(length - 1);
        const combos = [];
        for (const combo of smallerCombos) {
          for (const operator of operators) {
            combos.push([...combo, operator]); 
          }
        }
        return combos;
      }
      

      function evaluateExpression(numbers, operatorCombo) {
        let result = parseInt(numbers[0], 10);
        for (let i = 0; i < operatorCombo.length; i++) {
          const nextNumber = parseInt(numbers[i + 1], 10);
          if (operatorCombo[i] === '+') {
            result += nextNumber;
          } else if (operatorCombo[i] === '*') {
            result *= nextNumber;
          } else if (operatorCombo[i] === '||') {
            result = parseInt(result.toString() + nextNumber.toString(), 10);
          }
        }
        return result;
      }
      

    let totalCalibrationSum = 0;

    for (const { total, integers } of formattedInput) {
        const targetValue = parseInt(total, 10);
        const operatorCombos = generateOperatorCombinations(integers.length - 1);

        for (const operatorCombo of operatorCombos) {
            if (evaluateExpression(integers, operatorCombo) === targetValue) {
                totalCalibrationSum += targetValue;
                break;
            }
        }
    }

    console.log(totalCalibrationSum);
});
