import { requestInputData } from "../api.js";

const formatInput = (input) => {
  return input
    .trim()
    .split("\n")
    .map((line) => line.trim().split(""));
};

const findGuard = (map) => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (![".", "#"].includes(map[i][j])) {
        const directions = {
          "^": "up",
          "<": "left",
          ">": "right",
          v: "down",
        };
        return { row: i, col: j, direction: directions[map[i][j]] };
      }
    }
  }
};

const turnRight = (currentDirection) => {
  const directions = { up: "right", right: "down", down: "left", left: "up" };
  return directions[currentDirection];
};

const isObstacle = (row, col, formattedInput) => {
  return formattedInput[row][col] === "#";
};

const isOutOfBounds = (row, col, formattedInput) => {
  return (
    row < 0 ||
    col < 0 ||
    row >= formattedInput.length ||
    col >= formattedInput[0].length
  );
};
  
  

requestInputData(6).then((inputData) => {
  const formattedInput = formatInput(inputData);
  const guardLocation = findGuard(formattedInput);

  const visited = new Set();

  const markVisited = (row, col) => {
    visited.add(`${row},${col}`);
    formattedInput[row][col] = "X"
  };

  markVisited(guardLocation.row, guardLocation.col);

  while (
    guardLocation.row >= 0 &&
    guardLocation.row < formattedInput.length - 1 &&
    guardLocation.col >= 0 &&
    guardLocation.col < formattedInput[0].length - 1
  ) {
    if (guardLocation.direction === "up") {
      if (
        isOutOfBounds(guardLocation.row - 1, guardLocation.col, formattedInput)
      ) {
        break;
      } else if (
        isObstacle(guardLocation.row - 1, guardLocation.col, formattedInput)
      ) {
        guardLocation.direction = turnRight(guardLocation.direction);
      } else {
        guardLocation.row--;
        markVisited(guardLocation.row, guardLocation.col);
      }
    } else if (guardLocation.direction === "right") {
      if (
        isOutOfBounds(guardLocation.row, guardLocation.col + 1, formattedInput)
      ) {
        break;
      } else if (
        isObstacle(guardLocation.row, guardLocation.col + 1, formattedInput)
      ) {
        guardLocation.direction = turnRight(guardLocation.direction);
      } else {
        guardLocation.col++;
        markVisited(guardLocation.row, guardLocation.col);
      }
    } else if (guardLocation.direction === "down") {
        if (
            isOutOfBounds(guardLocation.row + 1, guardLocation.col, formattedInput)
          ) {
            break;
          }
      else if (
        isObstacle(guardLocation.row + 1, guardLocation.col, formattedInput)
      ) {
        guardLocation.direction = turnRight(guardLocation.direction);
      } else {
        guardLocation.row++;
        markVisited(guardLocation.row, guardLocation.col);
      }
    } else if (guardLocation.direction === "left") {
        if (
            isOutOfBounds(guardLocation.row, guardLocation.col - 1, formattedInput)
          ) {
            break;
          }
      else if (
        isObstacle(guardLocation.row, guardLocation.col - 1, formattedInput)
      ) {
        guardLocation.direction = turnRight(guardLocation.direction);
      } else {
        guardLocation.col--;
        markVisited(guardLocation.row, guardLocation.col);
      }
    }
  }

  console.log("Distinct positions visited:", visited.size);
});
