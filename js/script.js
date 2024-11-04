// Variables
const titleInput = document.getElementById("title");
const titleText = document.getElementById("title-text");
const xAxisSlider = document.getElementById("x-axis");
const initialLeft = parseInt(getComputedStyle(titleText).left, 10);
const yAxisSlider = document.getElementById("y-axis");
const initialTop = parseInt(getComputedStyle(titleText).top, 10);
const tshirtContainer = document.getElementById("tshirt-container");
const tshirtImage = document.getElementById("tshirt-image");
const characterText = document.getElementById("character-text");
const largeCharacter = document.getElementById("character-image");
const smallCharacter = document.getElementById("small-character-image");
const imagesContainer = document.getElementById("images-container");
const colorRadios = document.querySelectorAll("input[name='color']");

let imgSrc = "";



// Update the text in real time
titleInput.addEventListener("input", () => {

  // 10 character limit
  if (titleInput.value.length > 10) {
    titleInput.value = titleInput.value.slice(0, 10);
  }

  titleText.textContent = titleInput.value;

});

// Move the text horizontally and vertically
xAxisSlider.addEventListener("input", () => {
  titleText.style.left = `${initialLeft + parseInt(xAxisSlider.value, 10)}px`;
});

yAxisSlider.addEventListener("input", () => {

  titleText.style.top = `${initialTop + parseInt(yAxisSlider.value, 10)}px`;
});

// Change the t-shirt color
colorRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    const color = radio.value;
    if (radio.checked) {
      tshirtImage.src = `./images/${color}.PNG`
      if (color == "white") {
        titleText.style.color = "var(--matte-black)";
        characterText.style.color = "var(--matte-black)";
      } else {
        titleText.style.color = "white";
        characterText.style.color = "white";
      }
    }
  });
});

///////////////////////// Drag and drop functionality //////////////////////////////


function applyImageToTshirt(imgSrc) {

  largeCharacter.src = imgSrc;
  smallCharacter.src = imgSrc;

  const fileName = imgSrc.substring(imgSrc.lastIndexOf('/') + 1);


  const characterName = fileName.split('.')[0].toUpperCase();


  characterText.textContent = characterName;
}


imagesContainer.querySelectorAll(".image-item img").forEach(img => {
  img.draggable = true;
  img.addEventListener("dragstart", () => {
    imgSrc = img.src;
  });

  img.addEventListener("click", () => {
    applyImageToTshirt(img.src);
  });
});



tshirtContainer.addEventListener("dragover", (event) => {
  event.preventDefault();
});


tshirtContainer.addEventListener("drop", (event) => {
  event.preventDefault();


  if (imgSrc) {
    applyImageToTshirt(imgSrc);
  }

});
