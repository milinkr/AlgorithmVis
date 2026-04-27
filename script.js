const arrayContainer = document.getElementById("array");
const startBtn = document.getElementById("startBtn");
const sizeInput = document.getElementById("sizeInput");
const generateBtn = document.getElementById("generateBtn");
const errorText = document.getElementById("error");

let arr = [];
const SIZE = 20;

function generateArray(size) {
  arr = [];
  arrayContainer.innerHTML = "";
  bars = [];

  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 100) + 10;
    arr.push(value);

    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = value + "px";

    bars.push(bar);
    arrayContainer.appendChild(bar);
  }
}

generateBtn.addEventListener("click", () => {
  const value = sizeInput.value.trim();

  // проверка: число ли это
  const size = Number(value);

  if (
    value === "" ||
    isNaN(size) ||
    size < 1 ||
    size > 100
  ) {
    errorText.textContent = "Введите число от 1 до 100";
    return;
  }

  errorText.textContent = "";
  generateArray(size);
});

function renderArray(highlight = {}) {
  arrayContainer.innerHTML = "";

  arr.forEach((value, index) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = value + "px";

    if (highlight.red && highlight.red.includes(index)) {
      bar.classList.add("red");
    }

    if (highlight.green && highlight.green.includes(index)) {
      bar.classList.add("green");
    }

    arrayContainer.appendChild(bar);
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
  let n = arr.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      renderArray({ red: [j, j + 1] });
      await sleep(100);

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        renderArray({ red: [j, j + 1] });
        await sleep(100);
      }
    }
    renderArray({ green: Array.from({ length: n - i }, (_, k) => n - 1 - k) });
  }
}

startBtn.addEventListener("click", async () => {
  startBtn.disabled = true;
  await bubbleSort();
  startBtn.disabled = false;
});

generateArray(20);