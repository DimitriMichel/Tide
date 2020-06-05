import axios from "axios";
//CURRENTS
export const KEY = "26600fd9d21c3c15b3c846bb88c1137d";

export default axios.create({
  baseURL: "https://gnews.io/api/v3/search?",
});

//bg color edf3f6
