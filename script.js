const nextButton = document.getElementById("next_button");
const previousButton = document.getElementById("previous_button");
const gradientBox = document.querySelector(".gradient_display");
const leftColourBox = document.querySelector(".left_colour_box");
const rightColourBox = document.querySelector(".right_colour_box");
const rotateButton = document.getElementById("rotate");
const copyButton = document.getElementById("copy");
const randomButton = document.getElementById("random");
const categorySelect = document.getElementById("category");

let currentCategory = "cool";
let currentGradientIndex = 0;
let currentRotationIndex = 0;

const gradientCategories = {
  cool: [
    ["#2193B0", "#6DD5ED"],
    ["#00C6FF", "#0072FF"]
  ],
  warm: [
    ["#F12711", "#F5AF19"],
    ["#FF512F", "#F09819"]
  ],
  vibrant: [
    ["#FC466B", "#3F5EFB"],
    ["#8E2DE2", "#4A00E0"]
  ],
  dark: [
    ["#232526", "#414345"],
    ["#000000", "#434343"]
  ],
  light: [
    ["#FDFBFB", "#EBEDEE"],
    ["#F5F7FA", "#C3CFE2"]
  ],
  rustique: [
    ["#603813", "#B29F94"],
    ["#3E2723", "#A1887F"]
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

  gradientBox.style.background = `linear-gradient(${direction}, ${left}, ${right})`;
  leftColourBox.style.backgroundColor = left;
  rightColourBox.style.backgroundColor = right;
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
  applyGradient();
});

/* Copy gradient CSS */
copyButton.addEventListener("click", () => {
  const gradients = gradientCategories[currentCategory];
  const [left, right] = gradients[currentGradientIndex];
  const direction = rotations[currentRotationIndex];

  const cssCode = `background: linear-gradient(${direction}, ${left}, ${right});`;

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

/* Init */
applyGradient();
