import { DUMMY_USER_IMAGES } from './constants';

export const randomUser = () =>
  DUMMY_USER_IMAGES[Math.floor(Math.random() * DUMMY_USER_IMAGES.length)];
