"use strict";

window.onload = () => {
    if (window.Worker) {
        let countries = [
            "vn",
            "us",
            "ru",
            "jp",
            "au",
        ]
        let w;

        if (typeof(w) == "undefined") {
            w = new Worker("./worker.js");
        }

        w.onmessage = (event) => {
            for (let country of countries) {
                document.querySelector("#" + country).innerHTML = event.data[country];
            }
        };
    }
}