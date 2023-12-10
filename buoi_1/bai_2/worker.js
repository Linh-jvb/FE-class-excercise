"use strict";

importScripts('./lib/moment/moment.min.js');
importScripts('./lib/moment/moment-timezone.min.js');

function timeNow() {
    var now = moment();
    
    postMessage({
        "vn": now.tz("Asia/Ho_Chi_Minh").format("DD-MM-YYYY HH:mm:ss"),
        "us": now.tz("America/Boise").format("DD-MM-YYYY HH:mm:ss"),
        "ru": now.tz("Europe/Moscow").format("DD-MM-YYYY HH:mm:ss"),
        "jp": now.tz("Asia/Tokyo").format("DD-MM-YYYY HH:mm:ss"),
        "au": now.tz("Australia/ACT").format("DD-MM-YYYY HH:mm:ss"),
    });
    
    setTimeout("timeNow()", 1000);
}

timeNow();