"use strict";

let currentPage = 1;
let totalPage = 1;
const itemPerPage = 20;
let prevButton = document.querySelector('#prev-btn');
let nextButton = document.querySelector('#next-btn');
let pageInput = document.querySelector('.table-nav__input > input');


async function getListPokemonAt(page = 1) {
    let urlAPI = "https://pokeapi.co/api/v2/pokemon?offset=" + (itemPerPage * (page-1)) + "&limit=" + itemPerPage;
    let response = await fetch(urlAPI);
    let pokemons = await response.json();

    return pokemons;
}

const removeOldRows = () => {
    document.querySelector(".table-content__body").replaceChildren();
}

const addNewRows = (pokemons) => {
    let tableContentBody = document.querySelector(".table-content__body");

    pokemons.forEach(pokemon => {
        let rowElement = document.createElement('tr');

        let dataImg = document.createElement('td');
        dataImg.classList.add("table-data");
        let img = document.createElement("img");
        img.setAttribute("src", pokemon.url);
        img.setAttribute("alt", pokemon.name + " image");
        img.classList.add("table-data__image");
        dataImg.appendChild(img);
        rowElement.appendChild(dataImg);

        let dataName = document.createElement('td');
        dataName.classList.add("table-data");
        dataName.innerText = pokemon.name;
        rowElement.appendChild(dataName);

        let dataHeight = document.createElement('td');
        dataHeight.classList.add("table-data");
        dataHeight.innerText = pokemon.height;
        rowElement.appendChild(dataHeight);

        let dataWeight = document.createElement('td');
        dataWeight.classList.add("table-data");
        dataWeight.innerText = pokemon.weight;
        rowElement.appendChild(dataWeight);

        // console.log(rowElement);

        tableContentBody.appendChild(rowElement);
    });
}

const hiddenButton = () => {
    if (prevButton.classList.contains("hidden")) {
        prevButton.classList.remove("hidden");
    }
    if (nextButton.classList.contains("hidden")) {
        nextButton.classList.remove("hidden");
    }

    if (currentPage <= 1) {
        prevButton.classList.add("hidden");
    } else if (currentPage >= totalPage) {
        nextButton.classList.add("hidden");
    }
}

async function getListPokemonDetails(urlDetails) {
    let pokemons = [1, 2];
    let promises = urlDetails.map(url => fetch(url).then(response => response.json()));

    pokemons = await Promise.all(promises).then(results => {
        return results.map(pokemonDetail => {
            return {
                url: pokemonDetail.sprites.other.dream_world.front_default ?? pokemonDetail.sprites.front_default,
                name: pokemonDetail.name,
                height: pokemonDetail.height,
                weight: pokemonDetail.weight
            };
        });
    })

    // return await pokemons;
    return pokemons;
}


async function gotoPage(page = 1) {
    let data = await getListPokemonAt(page);
    
    // get api url to get detail of each pokemon
    let urlDetails = data.results.map(e => e.url);
    let pokemons = await getListPokemonDetails(urlDetails);

    // console.log(pokemons);

    removeOldRows();
    addNewRows(pokemons);

    // update page
    currentPage = page;
    totalPage = Math.ceil(data.count / itemPerPage);
    pageInput.value = page;

    // update table title
    let tableTitle = document.querySelector(".table-title");
    tableTitle.innerText = `Page ${page} of ${totalPage} pages`;

    hiddenButton();
}

window.onload = () => {
    gotoPage(1);

    prevButton.addEventListener('click', function(e) {
        // console.log(e);
        if (currentPage > 1) {
            currentPage -= 1;
            gotoPage(currentPage);
        }
    });

    nextButton.addEventListener('click', function(e) {
        // console.log(e);
        if (currentPage < totalPage) {
            currentPage += 1;
            gotoPage(currentPage);
        }
    });

    pageInput.addEventListener('keypress', function (e) {
        // console.log(e);
        if (e.key == "Enter") {
            let page = Number(e.target.value);
            if (page && page >= 1 && page <= totalPage && page != currentPage) {
                gotoPage(page);
            }
        } 
    })
}