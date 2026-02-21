import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;
const CLARIFAI_KEY = process.env.REACT_APP_CLARIFAI_KEY;

// تحليل النص
async function analyzeText() {
  const food = document.getElementById("foodInput").value;
  document.getElementById("result").innerText = "جاري التحليل...";

  const response = await fetch("/api/analyze-text", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ food })
  });
  const data = await response.json();
  document.getElementById("result").innerText = `${data.calories} kcal`;

  await supabase.from("meals").insert([{ food, calories: data.calories }]);
  showHalalSuggestions(food);
}

// تحليل الصورة
async function analyzeImage() {
  const fileInput = document.getElementById("imageInput");
  if (!fileInput.files.length) { alert("اختر صورة أولاً"); return; }
  document.getElementById("result").innerText = "جاري التحليل...";

  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = async () => {
    const base64Image = reader.result.split(',')[1];
    const response = await fetch("/api/analyze-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: base64Image })
    });
    const data = await response.json();
    document.getElementById("result").innerText = `${data.calories} kcal`;

    await supabase.from("meals").insert([{ food: data.name, calories: data.calories }]);
    showHalalSuggestions(data.name);
  };
  reader.readAsDataURL(file);
}

// اقتراح وجبات حلال
async function showHalalSuggestions(food) {
  const suggestions = await fetch("/api/halal-suggestions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ food })
  }).then(res => res.json());

  const container = document.getElementById("suggestions");
  container.innerHTML = suggestions.map(f => `<p>${f}</p>`).join("");
}
