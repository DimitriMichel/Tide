import axios from "axios";
//CURRENTS
let KEY = "eaf2773476064483b40c45df79edba85";

export default axios.create({
  baseURL: "https://newsapi.org/",
  headers: {
    "X-api-key": KEY,
  },
});

//bg color edf3f6
