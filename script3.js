let container = document.getElementById("container"); // Corrected variable name

let searchDiv = document.createElement("div");
searchDiv.id = "searchDiv";

let button = document.createElement("button");
button.innerText = "Search";

let input = document.createElement("input");
input.type = "text";
input.placeholder = "Search a painting";

searchDiv.append(button, input);
container.appendChild(searchDiv); // Corrected variable name

let resultsContainer = document.createElement("div");
resultsContainer.id = "resultsContainer"; // New div for storing search results
container.appendChild(resultsContainer);

const getPaintings = async () => {
  const result = await fetch(
    `https://openaccess-api.clevelandart.org/api/artworks?limit=20`
  );
  const data = await result.json();

  data.data.forEach((photo) => {
    const img = document.createElement("img");
    img.className = "image";
    img.style.margin = "5px";
    img.src = photo.images.web.url;
    img.style.width = "300px";
    img.style.height = "200px";
    container.appendChild(img);
  });
};

const getSearchedPaintings = async (event) => {
    event.preventDefault();
  
    const inputValue = input.value.trim();
  
    const result = await fetch(
      `https://openaccess-api.clevelandart.org/api/artworks?limit=10&has_image=1&q=${inputValue}`
    );
  
    let data = await result.json();

    resultsContainer.innerHTML = '';
  
    if (data.data.length === 0) {
      const infoElement = document.createElement("h2");
      infoElement.innerText = "Data not found";
      container.appendChild(infoElement);
    } else {
      const allImages = document.querySelectorAll(".image");
      allImages.forEach((img) => img.remove());
  
      data.data.forEach((photo) => {
        const imgContainer = document.createElement("div");
  
        const img = document.createElement("img");
        img.src = photo.images.web.url;
        img.alt = photo.alt_description;
        img.className = "image";
        img.style.width = "250px";
        img.style.objectFit = "cover";
        img.style.height = "200px";
        img.style.border = "1px solid black";
  
        const authorElement = document.createElement("p");
        authorElement.innerText = `Author: ${photo.creators[0]?.description || 'Undefined'}`;
  
        const titleElement = document.createElement("p");
        titleElement.innerText = `Title: ${photo.title || 'Undefined'}`;
  
        const yearElement = document.createElement("p");
        yearElement.innerText = `Year: ${photo.creation_date || 'Undefined'}`;
  
        imgContainer.appendChild(authorElement);
        imgContainer.appendChild(titleElement);
        imgContainer.appendChild(yearElement);
        imgContainer.appendChild(img);
  
        resultsContainer.appendChild(imgContainer);
      });
    }
  };
  
  getPaintings();
  button.addEventListener("click", getSearchedPaintings);




