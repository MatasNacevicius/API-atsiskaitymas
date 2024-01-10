let conteiner = document.getElementById("conteiner")

let button = document.createElement("button")
button.innerText = "Generate photo"
conteiner.appendChild(button)

let imgEl = document.createElement("img");
imgEl.style.width = "400px";
imgEl.style.height = "400px";
imgEl.style.display = "flex";
imgEl.style.flexDirection = "column";
imgEl.style.objectFit = "cover";
imgEl.style.margin = "50px"
imgEl.style.border = "2px solid black"

const getPhoto = async () => {
  const result = await fetch("https://dog.ceo/api/breeds/image/random");

  const data = await result.json();
  imgEl.src = data.message;

  conteiner.appendChild(imgEl);
};

button.addEventListener("click", getPhoto);


