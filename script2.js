let conteiner = document.getElementById("conteiner")
const API = "90cd9d2c"

let button = document.createElement("button");
button.innerText = "Search";

let input = document.createElement("input");
input.type = "text";
input.placeholder = "Search a movie";

conteiner.append(button, input);

const getMovie = async (event) => {
    event.preventDefault();
  
    const inputValue = input.value.trim().replace(/[^a-zA-Z0-9\s]/g, '');
    // console.log(inputValue);
  
    const result = await fetch(
      `https://www.omdbapi.com/?apikey=${API}&s=${inputValue}`
    );
    console.log(result);
  
    const data = await result.json();
    console.log(data);

    const allCards = document.querySelectorAll(".card, h2");
      allCards.forEach((element) => element.remove());
  
    if (data.Response === "False") {
      const infoElement = document.createElement("h2");
      infoElement.innerText = "Filmas nerastas";
      conteiner.appendChild(infoElement);
    } else {
    data.Search.forEach((title) => {
        const card = document.createElement("div");
        card.style.width = "600px";
        card.style.height = "300px";
        card.style.margin = "5px";
        card.style.border = "2px solid black";
        card.style.display = "flex";
        card.className = "card";
  
        const poster = document.createElement("img");
        poster.style.width = "200px";
        poster.style.height = "280px";
        poster.style.margin = "5px";
        poster.src = title.Poster;
  
        const movieInfo = document.createElement("div");
        movieInfo.style.flex = "1";
        movieInfo.style.textAlign = "center";
        movieInfo.style.display = "flex";
        movieInfo.style.flexDirection = "column";
        movieInfo.style.justifyContent = "center";
        movieInfo.style.margin = "0 5px 0 40px";
  
        const movieTitle = document.createElement("h3");
        movieTitle.innerText = title.Title;
  
        const movieYear = document.createElement("p");
        movieYear.innerText = title.Year;
  
        movieInfo.append(movieTitle, movieYear);
        card.append(poster, movieInfo);
        conteiner.appendChild(card);
      });
    }
  };
  
  button.addEventListener("click", getMovie);