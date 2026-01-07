const randomButton = document.getElementById("random");
const rotateButton = document.getElementById("rotate");
const copyButton = document.getElementById("copy");

const leftColorValue = document.getElementById("left_color_value");
const rightColorValue = document.getElementById("right_color_value");

const themeCards = document.querySelectorAll(".theme-card");

let currentCategory = "cool";
let currentGradientIndex = 0;
let currentRotationIndex = 0;

const rotations = [
  "to right",
  "to bottom",
  "to left",
  "to top"
];

const gradientCategories = {
  cool: [
    ["#2193B0", "#6DD5ED"],
    ["#00C6FF", "#0072FF"],
    ["#56CCF2", "#2F80ED"],
    ["#74ebd5", "#ACB6E5"]
  ],

  warm: [
    ["#F12711", "#F5AF19"],
    ["#FF512F", "#F09819"],
    ["#D38312", "#A83279"],
    ["#EB5757", "#F2994A"]
  ],

  vibrant: [
    ["#FC466B", "#3F5EFB"],
    ["#8E2DE2", "#4A00E0"],
    ["#12C2E9", "#C471ED"],
    ["#F953C6", "#B91D73"]
  ],

  dark: [
    ["#232526", "#414345"],
    ["#141E30", "#243B55"],
    ["#0F2027", "#203A43"],
    ["#1F1C2C", "#928DAB"]
  ],

  light: [
    ["#FDFBFB", "#EBEDEE"],
    ["#F5F7FA", "#C3CFE2"],
    ["#E0EAFC", "#CFDEF3"],
    ["#ECE9E6", "#FFFFFF"]
  ],

  rustique: [
    ["#603813", "#B29F94"],
    ["#3E2723", "#A1887F"],
    ["#795548", "#D7CCC8"],
    ["#4E342E", "#BCAAA4"]
  ],

  pastel: [
    ["#A1C4FD", "#C2E9FB"],
    ["#FBC8D4", "#9796F0"],
    ["#FFDDE1", "#EE9CA7"]
  ],

  neon: [
    ["#00F260", "#0575E6"],
    ["#FC00FF", "#00DBDE"],
    ["#FF416C", "#FF4B2B"]
  ]
};


function applyGradient() {
  const gradients = gradientCategories[currentCategory];
  const [left, right] = gradients[currentGradientIndex];
  const direction = rotations[currentRotationIndex];

  document.documentElement.style.setProperty("--color-1", left);
  document.documentElement.style.setProperty("--color-2", right);
  document.documentElement.style.setProperty("--direction", direction);

  leftColorValue.textContent = left;
  rightColorValue.textContent = right;
}

randomButton.addEventListener("click", () => {
  const gradients = gradientCategories[currentCategory];
  currentGradientIndex = Math.floor(Math.random() * gradients.length);
  applyGradient();
});

rotateButton.addEventListener("click", () => {
  currentRotationIndex = (currentRotationIndex + 1) % rotations.length;
  applyGradient();
});

copyButton.addEventListener("click", () => {
  const gradients = gradientCategories[currentCategory];
  const [left, right] = gradients[currentGradientIndex];
  const direction = rotations[currentRotationIndex];

  navigator.clipboard.writeText(
    `background: linear-gradient(${direction}, ${left}, ${right});`
  );

  copyButton.textContent = "Copied!";
  setTimeout(() => (copyButton.textContent = "<copy>"), 1200);
});

themeCards.forEach(card => {
  card.addEventListener("click", () => {
    currentCategory = card.dataset.category;
    currentGradientIndex = 0;
    applyGradient();
  });
});

applyGradient();
