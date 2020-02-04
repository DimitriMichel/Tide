import {
  LOADING_DATA,
  LIKE_WAVE,
  UNLIKE_WAVE,
  SET_WAVES,
  SET_WAVE
} from "../types";
import axios from "axios";

//GET all Waves from database
export const getWaves = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/waves")
    .then(result => {
      dispatch({ type: SET_WAVES, payload: result.data });
    })
    .catch(err => {
      dispatch({
        type: SET_WAVES,
        payload: []
      });
    });
};

//LIKE a Wave
export const likeWave = waveID => dispatch => {
  axios
    .get(`/wave/${waveID}/like`)
    .then(result => {
      dispatch({ type: LIKE_WAVE, payload: result.data });
    })
    .catch(err => console.log(err));
};

//UNLIKE a Wave
export const unlikeWave = waveID => dispatch => {
  axios
    .get(`/wave/${waveID}/unlike`)
    .then(result => {
      dispatch({ type: UNLIKE_WAVE, payload: result.data });
    })
    .catch(err => console.log(err));
};
