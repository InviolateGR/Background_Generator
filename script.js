const nextButton = document.getElementById("next_button");
const previousButton = document.getElementById("previous_button");
const gradientBox = document.querySelector(".gradient_display");
const leftColourBox = document.querySelector(".left_colour_box");
const rightColourBox = document.querySelector(".right_colour_box");
const rotateButton = document.getElementById("rotate");
const copyButton = document.getElementById("copy");
const randomButton = document.getElementById("random");
const categorySelect = document.getElementById("category");
const leftColorValue = document.getElementById("left_color_value");
const rightColorValue = document.getElementById("right_color_value");
const directionSelect = document.getElementById("direction");


let currentCategory = "cool";
let currentGradientIndex = 0;
let currentRotationIndex = 0;

const gradientCategories = {
  cool: [
    ["#2193B0", "#6DD5ED"],
    ["#00C6FF", "#0072FF"],
    ["#56CCF2", "#2F80ED"],
    ["#43C6AC", "#191654"],
    ["#2980B9", "#6DD5FA"]
  ],

  warm: [
    ["#F12711", "#F5AF19"],
    ["#FF512F", "#F09819"],
    ["#F2994A", "#F2C94C"],
    ["#D38312", "#A83279"],
    ["#EB5757", "#F2994A"]
  ],

  vibrant: [
    ["#FC466B", "#3F5EFB"],
    ["#8E2DE2", "#4A00E0"],
    ["#FF0084", "#33001B"],
    ["#F953C6", "#B91D73"],
    ["#12C2E9", "#C471ED"]
  ],

  dark: [
    ["#232526", "#414345"],
    ["#000000", "#434343"],
    ["#141E30", "#243B55"],
    ["#0F2027", "#203A43"],
    ["#1F1C2C", "#928DAB"]
  ],

  light: [
    ["#FDFBFB", "#EBEDEE"],
    ["#F5F7FA", "#C3CFE2"],
    ["#E0EAFC", "#CFDEF3"],
    ["#FDFCFB", "#E2D1C3"],
    ["#ECE9E6", "#FFFFFF"]
  ],

  rustique: [
    ["#603813", "#B29F94"],
    ["#3E2723", "#A1887F"],
    ["#795548", "#D7CCC8"],
    ["#4E342E", "#BCAAA4"],
    ["#6D4C41", "#D7CCC8"]
  ]
};


const rotations = [
  "to right",
  "to bottom right",
  "to bottom",
  "to bottom left",
  "to left",
  "to top left",
  "to top",
  "to top right"
];

function applyGradient() {
  const gradients = gradientCategories[currentCategory];
  const [left, right] = gradients[currentGradientIndex];
  const direction = rotations[currentRotationIndex];

  // Update CSS variables
  document.documentElement.style.setProperty("--color-1", left);
  document.documentElement.style.setProperty("--color-2", right);
  document.documentElement.style.setProperty("--direction", direction);

  // Update UI indicators
  leftColourBox.style.backgroundColor = left;
  rightColourBox.style.backgroundColor = right;

  leftColorValue.textContent = left.toUpperCase();
  rightColorValue.textContent = right.toUpperCase();
}



/* Navigation */
nextButton.addEventListener("click", () => {
  const gradients = gradientCategories[currentCategory];
  currentGradientIndex = (currentGradientIndex + 1) % gradients.length;
  applyGradient();
});

previousButton.addEventListener("click", () => {
  const gradients = gradientCategories[currentCategory];
  currentGradientIndex =
    (currentGradientIndex - 1 + gradients.length) % gradients.length;
  applyGradient();
});

/* Rotate Gradient */
rotateButton.addEventListener("click", () => {
  currentRotationIndex = (currentRotationIndex + 1) % rotations.length;
  directionSelect.value = currentRotationIndex;
  applyGradient();
});


/* Copy gradient CSS */
copyButton.addEventListener("click", () => {
  const gradients = gradientCategories[currentCategory];
  const [left, right] = gradients[currentGradientIndex];
  const direction = rotations[currentRotationIndex];

  const cssCode = `
background: linear-gradient(${direction}, ${left}, ${right});
`.trim();

  navigator.clipboard.writeText(cssCode).then(() => {
    copyButton.textContent = "Copied!";
    setTimeout(() => (copyButton.textContent = "Copy CSS"), 1500);
  });
});


/* Randomize gradient */
randomButton.addEventListener("click", () => {
  const gradients = gradientCategories[currentCategory];
  currentGradientIndex = Math.floor(Math.random() * gradients.length);
  currentRotationIndex = Math.floor(Math.random() * rotations.length);
  applyGradient();
});

/* Category change */
categorySelect.addEventListener("change", (e) => {
  currentCategory = e.target.value;
  currentGradientIndex = 0;
  applyGradient();
});

directionSelect.addEventListener("change", (e) => {
  currentRotationIndex = Number(e.target.value);
  applyGradient();
});


/* Init */
applyGradient();
