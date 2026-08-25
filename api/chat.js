export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const systemPrompt = `
You are an AI Assistant for Amiel's personal portfolio website. 
Answer questions concisely and politely as a friendly representative of Amiel.

Key Information about Amiel:
- Name: Amiel Jake
- Role: Frontend / Full-Stack Web Developer
- Core Tech Stack: React, JavaScript, Vite, Tailwind CSS, Node.js, Vercel
- Major Projects:
  1. BMS (Barangay Management System): Developed for client Barangay Bagbag Sauyo.
  2. Interactive Portfolio: Custom React app with Lenis smooth scrolling and Vercel Serverless backend.
- Tone: Professional, helpful, friendly, and approachable.

Instructions:
- Keep responses within 2 to 3 sentences.
- Only answer questions relevant to Amiel's portfolio, background, skills, and projects.
  `.trim();

  try {
    const hfToken = process.env.HUGGINGFACE_API_KEY;

    if (!hfToken) {
      return res.status(500).json({ error: 'Hugging Face API Token missing.' });
    }

    // Ginamit ang iyong eksaktong Router URL at Model ID mula sa PHP setup
    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        headers: {
          Authorization: `Bearer ${hfToken}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          model: "meta-llama/Llama-3.1-8B-Instruct:novita",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message }
          ],
          max_tokens: 150,
          temperature: 0.7,
        }),
      }
    );

    const result = await response.json();

    if (result.choices && result.choices[0]?.message?.content) {
      return res.status(200).json({ reply: result.choices[0].message.content.trim() });
    } else if (result.error) {
      return res.status(200).json({ reply: `HF Error: ${typeof result.error === 'object' ? JSON.stringify(result.error) : result.error}` });
    } else {
      return res.status(200).json({ reply: "Hi! How can I help you regarding Amiel's portfolio?" });
    }
  } catch (error) {
    console.error("API Fetch Error:", error);
    return res.status(500).json({ error: "Failed to connect with Hugging Face API." });
  }
}