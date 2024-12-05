import { isReportValid, formatData } from "./redNosedReports.js";

import { requestInputData } from "../api.js";

requestInputData(2).then((inputData)=>{
    const splitReports = formatData(inputData)

    let safeReports = 0

    splitReports.forEach((report)=>{
        if(isReportValid(report)){
            safeReports ++
        }
        else {
            for(let i = 0; i < report.length; i ++){
                const newReport = [...report.slice(0, i), ...report.slice(i + 1)]
                if (isReportValid(newReport)) {
                    safeReports++;
                    return; 
                  }
            }
        }
    })
    console.log("number of valid reports including ones with levels removed: ", safeReports)
})
