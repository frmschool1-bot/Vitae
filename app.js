async function analyzeText() {
  const food = document.getElementById("foodInput").value;
  document.getElementById("result").innerText = "Analyzing...";

  // سيتم ربط OpenAI هنا لاحقًا
  document.getElementById("result").innerText = "Feature coming soon";
}

async function analyzeImage() {
  document.getElementById("result").innerText = "Analyzing image...";
  // سيتم ربط Clarifai هنا لاحقًا
}
