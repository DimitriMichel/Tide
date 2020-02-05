import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_WAVE,
  UNLIKE_WAVE
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: []
};

// BIND API RESPONSE TO STATE
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case LIKE_WAVE:
      return {
        ...state,
        likes: [
          state.likes,
          {
            userHandle: state.credentials.handle,
            waveID: action.payload.waveID
          }
        ]
      };
    case UNLIKE_WAVE:
      return {
        ...state,
        likes: state.likes.filter(like => like.waveID === action.payload.waveID)
      };

    default:
      return state;
  }
}
