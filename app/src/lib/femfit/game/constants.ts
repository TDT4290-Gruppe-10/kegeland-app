import {Dimensions} from 'react-native';

export default {
  SPRITE_SIZE: 128,
  GRAVITY_Y: 1,
  PLAYER_VELOCITY_Y: 20,
  MAX_WIDTH: Dimensions.get('window').width,
  MAX_HEIGHT: Dimensions.get('window').height,
  FLOOR_HEIGHT: 50,
  BIRD_WIDTH: 40,
  BIRD_HEIGHT: 51,
  COIN_WIDTH: 20,
  COIN_HEIGHT: 20,
};
