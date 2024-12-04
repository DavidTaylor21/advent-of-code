import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const sessionId = process.env.SESSION_TOKEN;

export const requestInputData = (day) => {
  return axios.get(`https://adventofcode.com/2024/day/${day}/input`, {
    headers: {
      Cookie: `session=${sessionId}`,
    },
  }).then((response) => {
    return response.data
  })
  .catch((error) => {
    console.error('Error fetching input data:', error);
  });
};


