const randomButton = document.getElementById("random");
const rotateButton = document.getElementById("rotate");
const copyButton = document.getElementById("copy");

const leftColorValue = document.getElementById("left_color_value");
const rightColorValue = document.getElementById("right_color_value");

const themeCards = document.querySelectorAll(".theme-card");

let currentCategory = "cool";
let currentGradientIndex = 0;
let currentRotationIndex = 0;

const rotations = ["to right", "to bottom", "to left", "to top"];

const gradients = {
  cool: [
    ["#2193B0","#6DD5ED"], ["#00C6FF","#0072FF"], ["#56CCF2","#2F80ED"], ["#74ebd5","#ACB6E5"], ["#43C6AC","#191654"]
  ],
  warm: [
    ["#F12711","#F5AF19"], ["#FF512F","#F09819"], ["#D38312","#A83279"], ["#EB5757","#F2994A"], ["#FF7E5F","#FEB47B"]
  ],
  vibrant: [
    ["#FC466B","#3F5EFB"], ["#8E2DE2","#4A00E0"], ["#12C2E9","#C471ED"], ["#F953C6","#B91D73"], ["#FF4E50","#F9D423"]
  ],
  dark: [
    ["#232526","#414345"], ["#141E30","#243B55"], ["#0F2027","#203A43"], ["#1F1C2C","#928DAB"], ["#2C3E50","#4CA1AF"]
  ],
  light: [
    ["#FDFBFB","#EBEDEE"], ["#F5F7FA","#C3CFE2"], ["#E0EAFC","#CFDEF3"], ["#ECE9E6","#FFFFFF"], ["#FAACA8","#DDD6F3"]
  ],
  rustique: [
    ["#603813","#B29F94"], ["#3E2723","#A1887F"], ["#795548","#D7CCC8"], ["#4E342E","#BCAAA4"], ["#8D6E63","#D7CCC8"]
  ],
  pastel: [
    ["#A1C4FD","#C2E9FB"], ["#FBC8D4","#9796F0"], ["#FFDDE1","#EE9CA7"], ["#FAD0C4","#FFD1FF"], ["#C1C8E4","#E9F0FF"]
  ],
  neon: [
    ["#00F260","#0575E6"], ["#FC00FF","#00DBDE"], ["#FF416C","#FF4B2B"], ["#08F7FE","#FE53BB"], ["#FDEB71","#F8D800"]
  ]
};


function applyGradient() {
  const [c1, c2] = gradients[currentCategory][currentGradientIndex];
  const dir = rotations[currentRotationIndex];

  document.documentElement.style.setProperty("--color-1", c1);
  document.documentElement.style.setProperty("--color-2", c2);
  document.documentElement.style.setProperty("--direction", dir);

  leftColorValue.textContent = c1;
  rightColorValue.textContent = c2;
}

randomButton.onclick = () => {
  currentGradientIndex = Math.floor(Math.random() * gradients[currentCategory].length);
  applyGradient();
};

rotateButton.onclick = () => {
  currentRotationIndex = (currentRotationIndex + 1) % rotations.length;
  applyGradient();
};

copyButton.onclick = () => {
  const css = `background: linear-gradient(${rotations[currentRotationIndex]}, ${leftColorValue.textContent}, ${rightColorValue.textContent});`;
  navigator.clipboard.writeText(css);
};

themeCards.forEach(card => {
  card.onclick = () => {
    currentCategory = card.dataset.category;
    currentGradientIndex = 0;
    applyGradient();
  };
});

document.addEventListener("keydown", (e) => {
  switch(e.key.toLowerCase()) {
    case "r": // Rotate
      rotateButton.click();
      break;
    case "c": // Copy
      copyButton.click();
      break;
    case "x": // Random
      randomButton.click();
      break;
    default: 
      break;
  }
});


applyGradient();
