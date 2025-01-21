import { requestInputData } from "../api.js";

requestInputData(5).then((inputData) => {
  const lines = inputData.split("\n");
  const pageOrderingRules = [];
  const pageUpdates = [];
  lines.forEach((line) => {
    if (line.includes("|")) {
      pageOrderingRules.push(line);
    } else if (line.includes(",")) {
      pageUpdates.push(line);
    }
  });
  const pageUpdatesData = pageUpdates.map((pageUpdate) => {
    const splitPageUpdate = pageUpdate.split(",");
    return splitPageUpdate.map((pageNumber) => {
      return parseInt(pageNumber);
    });
  });
  const pageOrderingRulesData = pageOrderingRules.map((rule) => {
    const [X, Y] = rule.split("|").map(Number);
    return [X, Y];
  });
  const invalidUpdates = [];
  pageUpdatesData.forEach((pageUpdate) => {
    for (let i = 0; i < pageUpdate.length - 1; i++) {
      for (let j = i + 1; j < pageUpdate.length; j++) {
        pageOrderingRulesData.forEach((pageOrderingRule) => {
          if (
            pageOrderingRule.includes(pageUpdate[i]) &&
            pageOrderingRule.includes(pageUpdate[j])
          ) {
            if (pageOrderingRule[0] != pageUpdate[i]) {
              invalidUpdates.push(pageUpdate);
            }
          }
        });
      }
    }
  });
  const correctUpdates = pageUpdatesData.filter((pageUpdate) => {
    return !invalidUpdates.includes(pageUpdate);
  });
  let answer = 0;
  correctUpdates.forEach((correctUpdate) => {
    answer += correctUpdate[Math.floor(correctUpdate.length / 2)];
  });
  console.log("correct updates answer:", answer);
  
  const uniqueInvalidUpdates = []
  invalidUpdates.forEach((invalidUpdate)=>{
    if(!uniqueInvalidUpdates.some((update) => JSON.stringify(update) === JSON.stringify(invalidUpdate))){
      uniqueInvalidUpdates.push(invalidUpdate)
    }
  })

  const correctedInvalidUpdates = uniqueInvalidUpdates.map((invalidUpdate) => {
    let sortedUpdate = [...invalidUpdate];
    for (let i = 0; i < sortedUpdate.length - 1; i++) {
      for (let j = i + 1; j < sortedUpdate.length; j++) {
        const orderingRule = pageOrderingRulesData.find(
          ([X, Y]) =>
            (X === sortedUpdate[i] && Y === sortedUpdate[j]) ||
            (X === sortedUpdate[j] && Y === sortedUpdate[i])
        );

        if (orderingRule) {
          if (
            orderingRule[0] === sortedUpdate[j] &&
            orderingRule[1] === sortedUpdate[i]
          ) {
            [sortedUpdate[i], sortedUpdate[j]] = [
              sortedUpdate[j],
              sortedUpdate[i],
            ];
          }
        }
      }
    }

    return sortedUpdate;
  });
  let correctedUpdatesAnswer = 0;
  correctedInvalidUpdates.forEach((correctedUpdate) => {
    correctedUpdatesAnswer +=
      correctedUpdate[Math.floor(correctedUpdate.length / 2)];
  });
  console.log("corrected updates answer: ", correctedUpdatesAnswer);
});
