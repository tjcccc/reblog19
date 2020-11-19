import { LOAD_CONFIG } from './actionTypes';

// export const loadConfig = (config) => ({
//   type: LOAD_CONFIG,
//   config: config
// });

export const loadConfig = (config) => {
  return {
    type: LOAD_CONFIG,
    config: config
  }
}
