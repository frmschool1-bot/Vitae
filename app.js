// --- OpenAI, Clarifai, Supabase placeholders ---
async function analyzeText() {
  const food = document.getElementById("foodInput").value;
  document.getElementById("result").innerText = "Analyzing text...";

  // هنا سنضيف OpenAI لاحقاً لحساب السعرات
  document.getElementById("result").innerText = "Calories will appear here";
}

async function analyzeImage() {
  const fileInput = document.getElementById("imageInput");
  if (!fileInput.files.length) {
    alert("Please select an image first");
    return;
  }
  document.getElementById("result").innerText = "Analyzing image...";

  // هنا سنضيف Clarifai لاحقاً لتحليل الصورة
}
