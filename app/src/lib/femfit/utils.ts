import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getPipeSizePosPair = (addToPosX: number = 0) => {
  const yPosTop = -getRandom(300, windowHeight - 100);
  const pipeTop = {
    pos: {x: windowWidth + addToPosX, y: yPosTop},
    size: {height: windowHeight * 2, width: 75},
  };
  const pipeBottom = {
    pos: {x: windowWidth + addToPosX, y: windowHeight * 2 + 200 + yPosTop},
    size: {height: windowHeight * 2, width: 75},
  };

  return {pipeTop, pipeBottom};
};
