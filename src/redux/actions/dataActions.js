import {
  LOADING_DATA,
  LIKE_WAVE,
  UNLIKE_WAVE,
  SET_WAVES,
  SET_WAVE,
  DELETE_WAVE,
  LOADING_UI,
  POST_WAVE,
  CLEAR_ERRORS,
  SET_ERRORS,
  STOP_LOADING_UI
} from "../types";

import axios from "axios";

//GET ALL WAVES
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

//LIKE WAVE
export const likeWave = waveID => dispatch => {
  axios
    .get(`/wave/${waveID}/like`)
    .then(result => {
      dispatch({ type: LIKE_WAVE, payload: result.data });
    })
    .catch(err => console.log(err));
};

//UNLIKE WAVE
export const unlikeWave = waveID => dispatch => {
  axios
    .get(`/wave/${waveID}/unlike`)
    .then(result => {
      dispatch({ type: UNLIKE_WAVE, payload: result.data });
    })
    .catch(err => console.log(err));
};
//POST WAVE
export const postWave = newWave => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/wave", newWave)
    .then(response => {
      dispatch({ type: POST_WAVE, payload: response.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

//DELETE WAVE
export const deleteWave = waveID => dispatch => {
  axios
    .delete(`/wave/${waveID}`)
    .then(() => {
      dispatch({ type: DELETE_WAVE, payload: waveID });
    })
    .catch(err => console.log(err));
};

// GET ONE WAVE
export const getWave = waveID => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/wave/${waveID}`)
    .then(response => {
      dispatch({ type: SET_WAVE, payload: response.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};
export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
