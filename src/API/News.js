import axios from "axios";
//CURRENTS
let KEY = "eaf2773476064483b40c45df79edba85";

export default axios.create({
  baseURL: "https://stormy-fortress-63048.herokuapp.com/https://newsapi.org/",
  headers: {
    "x-api-key": KEY,
  },
});

//bg color edf3f6
