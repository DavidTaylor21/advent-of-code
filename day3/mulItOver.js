import { requestInputData } from "../api.js";

requestInputData(3).then((inputData) => {
  const matches = inputData.match(/mul\(\d{1,3},\d{1,3}\)/g);
  const numberPairs = matches.map((match) => {
    return match.match(/\d{1,3}/g);
  });
  let result = 0
  numberPairs.forEach((numberPair)=>{
    result += parseInt(numberPair[0]) * parseInt(numberPair[1])
  })
  console.log("result: ", result)
});
