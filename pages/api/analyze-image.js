import fetch from "node-fetch";

export default async function handler(req, res) {
  const { image } = req.body;
  try {
    const response = await fetch("https://api.clarifai.com/v2/models/food-image-recognition/outputs", {
      method: "POST",
      headers: {
        "Authorization": `Key ${process.env.CLARIFAI_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: [{ data: { image: { base64: image } } }]
      })
    });
    const data = await response.json();
    const foodName = data.outputs[0].data.concepts[0].name;
    const calories = 100; // يمكن تحسينه لاحقًا بالربط مع OpenAI
    res.status(200).json({ name: foodName, calories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
