import {
  SET_WAVES,
  LIKE_WAVE,
  UNLIKE_WAVE,
  LOADING_DATA,
  DELETE_WAVE,
  POST_WAVE,
  SET_WAVE,
  SUBMIT_COMMENT
} from "../types";

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
    case SET_WAVE:
      return {
        ...state,
        wave: action.payload
      };
    case LIKE_WAVE:
    case UNLIKE_WAVE:
      let index = state.waves.findIndex(
        wave => wave.waveID === action.payload.waveID
      );
      state.waves[index] = action.payload;
      if (state.wave.waveID === action.payload.waveID) {
        let tempCommentsArray = state.wave.comments;
        state.wave = action.payload;
        state.wave.comments = tempCommentsArray;
      }
      return {
        ...state
      };
    case DELETE_WAVE:
      let waveIndex = state.waves.findIndex(
        wave => wave.waveID === action.payload
      );
      state.waves.splice(waveIndex, 1);
      return {
        ...state
      };
    case POST_WAVE:
      return {
        ...state,
        waves: [action.payload, ...state.waves]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        wave: {
          ...state.wave,
          comments: [action.payload, ...state.wave.comments]
        }
      };

    default:
      return state;
  }
}
