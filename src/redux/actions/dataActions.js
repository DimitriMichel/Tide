import {
  SET_WAVES,
  LOADING_DATA,
  LIKE_WAVE,
  UNLIKE_WAVE,
  DELETE_WAVE,
  SET_ERRORS,
  POST_WAVE,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_WAVE,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
} from "../types";
import axios from "axios";


export const getWaves = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/waves")
    .then(res => {
      dispatch({
        type: SET_WAVES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_WAVES,
        payload: []
      });
    });
};
export const getWave = waveID => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/wave/${waveID}`)
    .then(res => {
      dispatch({
        type: SET_WAVE,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};

export const postWave = newWave => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/wave", newWave)
    .then(res => {
      dispatch({
        type: POST_WAVE,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const likeWave = waveID => dispatch => {
  axios
    .get(`/wave/${waveID}/like`)
    .then(res => {
      dispatch({
        type: LIKE_WAVE,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const unlikeWave = waveID => dispatch => {
  axios
    .get(`/wave/${waveID}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_WAVE,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const submitComment = (waveID, commentData) => dispatch => {
  axios
    .post(`/wave/${waveID}/comment`, commentData)
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
export const deleteWave = waveID => dispatch => {
  axios
    .delete(`/wave/${waveID}`)
    .then(() => {
      dispatch({ type: DELETE_WAVE, payload: waveID });
    })
    .catch(err => console.log(err));
};

export const getUserData = userHandle => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then(res => {
      dispatch({
        type: SET_WAVES,
        payload: res.data.waves
      });
    })
    .catch(() => {
      dispatch({
        type: SET_WAVES,
        payload: null
      });
    });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
