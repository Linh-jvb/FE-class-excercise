"use strict";

window.onload = function () {
    if (window.Worker) {
        var countries = [
            "vn",
            "us",
            "ru",
            "jp",
            "au",
        ]
        var w;

        if (typeof(w) == "undefined") {
            w = new Worker("./worker.js");
        }

        w.onmessage = function(event) {
            countries.forEach(country => {
                document.querySelector("#" + country).innerHTML = event.data[country];
            });
        };
    }
}