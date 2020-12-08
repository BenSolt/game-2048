const setImmutable = input => JSON.parse(JSON.stringify(input));
const addFunction = state => {
  let result = setImmutable(state); 
  const num = Math.random() < 0.9 ? 2 : 4;
  const isNull = input => input === null;
  while (true) {
    const randomColumn = Math.floor(Math.random() * 4);
    const randobRow = Math.floor(Math.random() * 4);
    if (isNull(result[randomColumn][randobRow])) {
      result[randomColumn][randobRow] = num;
      break;
    }
  }
  return result;
};
const compare = (a, b) => {
  if (typeof a === "number" && typeof b === "number") {
    return 0;
  } else if (typeof a === "number" && b === null) {
    return -1;
  }
  return 1;
};
const sortFunction = (list, direction) => {
  let result = setImmutable(list);
  switch (direction) {
    case "left":
      result.sort(compare);
      break;
    case "right":
      result.reverse();
      result.sort(compare);
      result.reverse();
      break;
    case "top":
      for (let row = 0; row < result.length; row++) {
        let array = [];
        for (let column = 0; column < result.length; column++) {
          if (result[column][row]) {
            array.push(result[column][row]);
            result[column][row] = null;
          }
        }
        for (let i = 0; i < array.length; i++) {
          result[i][row] = array[i];
        }
      }
      break;
    case "bottom":
      for (let row = 0; row < result.length; row++) {
        let array = [];
        for (let column = 0; column < result.length; column++) {
          if (result[column][row]) {
            array.push(result[column][row]);
            result[column][row] = null;
          }
        }
        for (let i = 0; i < array.length; i++) {
          result[4 - i][row] = array[i];
        }
      }
      break;
    default:
      console.error("error");
  }
  return result;
};
const CalculateLeftOrRight = (
  list,
  { firstValue, secondValue, plusOrMinus }
) => {
  let result = setImmutable(list);
  for (
    let column = firstValue;
    firstValue === 0 ? column < result.length : column > -1;
    firstValue === 0 ? column++ : column--
  ) {
    for (
      let row = secondValue;
      secondValue === 1 ? row < result[column].length : row > -1;
      secondValue === 1 ? row++ : row--
    ) {
      if (
        result[column][row + plusOrMinus] === result[column][row] &&
        result[column][row + plusOrMinus] !== null
      ) {
        result[column][row + plusOrMinus] *= 2;
        result[column][row] = null;
      }
    }
  }
  return result;
};
const CalculateTopOrBottom = (
  list,
  { firstValue, secondValue, plusOrMinus }
) => {
  let result = setImmutable(list);
  for (
    let row = firstValue;
    firstValue === 0 ? row < result.length : row > -1;
    firstValue === 0 ? row++ : row--
  ) {
    for (
      let column = secondValue;
      secondValue === 1 ? column < result.length : column > -1;
      secondValue === 1 ? column++ : column--
    ) {
      if (
        result[column + plusOrMinus][row] === result[column][row] &&
        result[column + plusOrMinus][row] !== null
      ) {
        result[column + plusOrMinus][row] *= 2;
        result[column][row] = null;
      }
    }
  }
  return result;
};

export {
  setImmutable,
  CalculateLeftOrRight,
  CalculateTopOrBottom,
  addFunction,
  sortFunction
};
