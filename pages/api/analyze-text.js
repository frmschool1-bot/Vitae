import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export default async function handler(req, res) {
  const { food } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "احسب السعرات للوجبة وأعد JSON" },
        { role: "user", content: `كم سعرات ${food}؟` }
      ]
    });
    const text = completion.choices[0].message.content;
    const calories = parseInt(text.replace(/\D/g, "")) || 0;
    res.status(200).json({ calories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
