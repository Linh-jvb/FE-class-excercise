"use strict";

function submitHandle() {
    let text = document.getElementById('text-input').value;
    console.log([document.getElementById('text-input')]);

    let divSol1 = document.getElementById('solu-1');
    divSol1.innerHTML = solution1(text);

    let divSol2 = document.getElementById('solu-2');
    divSol2.innerHTML = solution2(text);

    let divSol3 = document.getElementById('solu-3');
    divSol3.innerHTML = solution3(text);
}

function solution1(text) {
    const regex = /\b[^\s]+\b/g;

    return text.match(regex).join(' ');
}

function solution2(text) {
    let result = "";
    let beforeIsLetter = false;
    let textLen = text.length;

    for (let i = 0; i < textLen; i++) {
        let ch = text.charAt(i);

        if (isWhitespace(ch)) {
            beforeIsLetter = false;
        } else {
            if (beforeIsLetter || result.length == 0) {
                result += ch;
            } else {
                result += " " + ch;
            }

            beforeIsLetter = true;
        }
    }

    return result;
}

function isWhitespace(char) {
    return (char == ' ') || (char == '\t') || (char == '\n');
}

function solution3(text) {
    const regex = /\s+/g;

    let divElement = document.createElement('template');
    divElement.innerHTML = text;
    // let textNode   = document.createTextNode(text);

    // divElement.appendChild(textNode);
    console.log([divElement]);
    return divElement.innerText;
}

window.onload = function () {
    document.getElementById('text-input').value = `
    JVB Việt Nam           
JVB Việt  Nam
JVB                   Việt          Nam          
      JVB         Việt  Nam        

`;

    let btn = document.getElementById('submit');

    btn.onclick = submitHandle;
}