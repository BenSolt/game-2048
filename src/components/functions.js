import {
    setImmutable,
    addFunction,
    CalculateLeftOrRight,
    CalculateTopOrBottom,
    sortFunction
  } from "./subFunctions";
  
  const checkChange = (a, b) => {
    let isSame = true;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (a[i][j] !== b[i][j]) {
          isSame = false;
        }
      }
    }
    return isSame;
  };
  const onLeft = (state, callback) => {
    let aList = setImmutable(state); 
    for (let column = 0; column < aList.length; column++) {
      aList[column] = sortFunction(aList[column], "left");
    }
    aList = sumNum(aList, "left");
    for (let column = 0; column < aList.length; column++) {
      aList[column] = sortFunction(aList[column], "left");
    }
    if (checkChange(aList, state)) return state;
    callback();
    return addFunction(aList);
  };
  
  const onRight = (state, callback) => {
    let aList = setImmutable(state); 
    for (let column = 0; column < aList.length; column++) {
      aList[column] = sortFunction(aList[column], "right");
    }
  
    aList = sumNum(aList, "right");
    for (let column = 0; column < aList.length; column++) {
      aList[column] = sortFunction(aList[column], "right");
    }
  
    if (checkChange(aList, state)) return state;
    callback();
    return addFunction(aList);
  };
  
  const onTop = (state, callback) => {
    let aList = setImmutable(state);
    // aList = sortFunction(aList, "top");
    // aList = sumNum(aList, "top");
    // aList = sortFunction(aList, "top");
    aList = RecursiveTop(aList);
    if (checkChange(aList, state)) return state;
    callback();
    return addFunction(aList);
  };
  
  const onBottom = (state, callback) => {
    let aList = setImmutable(state);
    aList = AwesomeRecursion(aList);
  
    if (checkChange(aList, state)) return state;
    callback();
    return addFunction(aList);
  };
  const RecursiveTop = (List, preColumn = 0, row = 0, column = 1) => {
    const isFive = (n) => n === 5;
    if (isFive(row)) {
      return List;
    }
    if (preColumn === column) {
      return isFive(column + 1)
        ? RecursiveTop(List, 0, row + 1, 1)
        : RecursiveTop(List, preColumn, row, column + 1);
    }
    let nextList = JSON.parse(JSON.stringify(List));
    const isPreValNumber = List[preColumn][row] !== null;
    const currentValue = List[column][row];
    if (isPreValNumber) {
      if (currentValue === null) {
        return isFive(column + 1)
          ? RecursiveTop(nextList, 0, row + 1, 1)
          : RecursiveTop(nextList, preColumn, row, column + 1);
      } else {
        if (currentValue === nextList[preColumn][row]) {
          nextList[preColumn][row] *= 2;
          nextList[column][row] = null;
          return isFive(column + 1)
            ? RecursiveTop(nextList, 0, row + 1, 1)
            : RecursiveTop(nextList, preColumn + 1, row, column + 1);
        }
        if (nextList[preColumn + 1][row] === null) {
          nextList[preColumn + 1][row] = nextList[column][row];
          nextList[column][row] = null;
          return isFive(column + 1)
            ? RecursiveTop(nextList, 0, row + 1, 1)
            : RecursiveTop(nextList, preColumn + 1, row, column + 1);
        } else {
          return isFive(column + 1)
            ? RecursiveTop(nextList, 0, row + 1, 1)
            : RecursiveTop(nextList, preColumn + 1, row, column);
        }
      }
    }
    if (currentValue === null) {
      return isFive(column + 1)
        ? RecursiveTop(nextList, 0, row + 1, 1)
        : RecursiveTop(nextList, preColumn, row, column + 1);
    }
    // situation that currentValue is number and previousValue is null
    nextList[preColumn][row] = currentValue;
    nextList[column][row] = null;
    return isFive(column + 1)
      ? RecursiveTop(nextList, 0, row + 1, 1)
      : RecursiveTop(nextList, preColumn, row, column + 1);
  };
  
  const AwesomeRecursion = (List, preColumn = 4, row = 4, column = 3) => {
    const isMinusOne = (n) => n === -1;
    if (isMinusOne(row)) {
      return List;
    }
    if (preColumn === column) {
      return isMinusOne(column)
        ? AwesomeRecursion(List, 4, row - 1, 3)
        : AwesomeRecursion(List, preColumn, row, column - 1);
    }
    let nextList = JSON.parse(JSON.stringify(List));
    const isPreValNumber = List[preColumn][row] !== null;
  
    const currentValue = List[column][row];
  
    if (isPreValNumber) {
      if (currentValue === null) {
        return isMinusOne(column - 1)
          ? AwesomeRecursion(nextList, 4, row - 1, 3)
          : AwesomeRecursion(nextList, preColumn, row, column - 1);
      } else {
        if (currentValue === nextList[preColumn][row]) {
          nextList[preColumn][row] *= 2;
          nextList[column][row] = null;
          return isMinusOne(column - 1)
            ? AwesomeRecursion(nextList, 4, row - 1, 3)
            : AwesomeRecursion(nextList, preColumn - 1, row, column - 1);
        }
        if (nextList[preColumn - 1][row] === null) {
          nextList[preColumn - 1][row] = nextList[column][row];
          nextList[column][row] = null;
          return isMinusOne(column - 1)
            ? AwesomeRecursion(nextList, 4, row - 1, 3)
            : AwesomeRecursion(nextList, preColumn - 1, row, column - 1);
        } else {
          return isMinusOne(column - 1)
            ? AwesomeRecursion(nextList, 4, row - 1, 3)
            : AwesomeRecursion(nextList, preColumn - 1, row, column);
        }
      }
    }
    if (currentValue === null) {
      return isMinusOne(column - 1)
        ? AwesomeRecursion(nextList, 4, row - 1, 3)
        : AwesomeRecursion(nextList, preColumn, row, column - 1);
    }
    // situation that currentValue is number and previousValue is null
    nextList[preColumn][row] = currentValue;
    nextList[column][row] = null;
    return isMinusOne(column - 1)
      ? AwesomeRecursion(nextList, 4, row - 1, 3)
      : AwesomeRecursion(nextList, preColumn, row, column - 1);
  };
  
  const sumNum = (list, direction) => {
    let input = setImmutable(list); 
    switch (direction) {
      case "left":
        input = CalculateLeftOrRight(input, {
          firstValue: 0,
          secondValue: 1,
          plusOrMinus: -1
        });
        break;
      case "right":
        input = CalculateLeftOrRight(input, {
          firstValue: 0,
          secondValue: 3,
          plusOrMinus: 1
        });
        break;
      case "top":
        input = CalculateTopOrBottom(input, {
          firstValue: 0,
          secondValue: 1,
          plusOrMinus: -1
        });
        break;
      case "bottom":
        input = CalculateTopOrBottom(input, {
          firstValue: 0,
          secondValue: 3,
          plusOrMinus: 1
        });
        break;
      default:
        console.error("Computing Error!");
        break;
    }
    return input;
  };
  export { onLeft, onRight, onTop, onBottom };
  