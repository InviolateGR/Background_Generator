const nextButton = document.getElementById("next_button");
const previousButton = document.getElementById("previous_button");
const gradientBox = document.querySelector(".gradient_display");
const leftColourBox = document.querySelector(".left_colour_box");
const rightColourBox = document.querySelector(".right_colour_box");
const rotateButton = document.getElementById("rotate");

const gradientList = [
  ["#FF6B81", "#C774E7"],
  ["#5E22D6", "#45B8C7"],
  ["#C81F83", "#F37094"],
  ["#00416A", "#E4E5E6"],
  ["#FFE259", "#FFA751"],
  ["#799F0C", "#ACBB78"],
  ["#334D50", "#CBCaa5"],
  ["#F7F8F8", "#ACBB78"]
];

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

let currentGradientIndex = 0;
let currentRotationIndex = 0;

function applyGradient() {
  const [left, right] = gradientList[currentGradientIndex];
  const direction = rotations[currentRotationIndex];

  gradientBox.style.background = `linear-gradient(${direction}, ${left}, ${right})`;
  leftColourBox.style.backgroundColor = left;
  rightColourBox.style.backgroundColor = right;
}

/* Navigation */
nextButton.addEventListener("click", () => {
  currentGradientIndex = (currentGradientIndex + 1) % gradientList.length;
  applyGradient();
});

previousButton.addEventListener("click", () => {
  currentGradientIndex =
    (currentGradientIndex - 1 + gradientList.length) % gradientList.length;
  applyGradient();
});

/* Rotate Gradient */
rotateButton.addEventListener("click", () => {
  currentRotationIndex = (currentRotationIndex + 1) % rotations.length;
  applyGradient();
});

/* Init */
applyGradient();
