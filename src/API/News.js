import axios from "axios";
//CURRENTS
const KEY = "80bb967667c74814a29ca7a9e0562503";

export default axios.create({
    baseURL: "https://newsapi.org/",
    headers: {
        "X-Api-Key": KEY,
    }

});

//bg color edf3f6