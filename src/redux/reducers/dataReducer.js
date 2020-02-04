import { SET_WAVES, LIKE_WAVE, UNLIKE_WAVE, LOADING_DATA } from "../types";

const initialState = {
  waves: [],
  wave: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_WAVES:
      return {
        ...state,
        waves: action.payload,
        loading: false
      };
    case LIKE_WAVE:
    case UNLIKE_WAVE:
      let index = state.waves.findIndex(
        wave => wave.waveID === action.payload.waveID
      );
      state.waves[index] = action.payload;
      return {
        ...state
      };
  }
}
