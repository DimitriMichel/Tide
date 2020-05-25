import axios from "axios";
//CURRENTS
const KEY = "c0b480701a314f00b5207a9eff9753c5";

export default axios.create({
    baseURL: "https://newsapi.org/",
    headers: {
        "X-Api-Key": KEY,
    }

});

//bg color edf3f6
