import { requestInputData } from "../api.js";

export const isReportValid = (report) => {
  if (report.length < 2) {
    return false;
  }

  let increasing = true;
  let decreasing = true;

  for (let i = 0; i < report.length - 1; i++) {
    const difference = report[i + 1] - report[i];

    if (Math.abs(difference) < 1 || Math.abs(difference) > 3) {
      return false;
    }

    if (difference > 0) decreasing = false;
    if (difference < 0) increasing = false;
  }

  return increasing || decreasing;
};

export const formatData = (inputData) => {
    const reports = inputData.split("\n");

    return reports.map((report) => {
      return report.split(" ").map(Number);
    });
}

requestInputData(2).then((inputData) => {
  const splitReports = formatData(inputData)

  const validReports = splitReports.filter((report) => isReportValid(report));

  console.log("number of valid reports: ", validReports.length);
});
