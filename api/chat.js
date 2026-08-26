import * as aboutMeModule from '../src/data/aboutMeData.js';
import * as projectsModule from '../src/data/projectsData.js';
import * as skillsModule from '../src/data/skillsData.js';

export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;
    const apiKey = process.env.HUGGINGFACE_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'Hugging Face API key is not configured on Vercel environment variables.' });
    }

    // Kunin ang data mula sa default o named export para ligtas sa kahit anong format
    const aboutMeData = aboutMeModule.default || aboutMeModule.aboutMeData || aboutMeModule;
    const projectsData = projectsModule.default || projectsModule.projectsData || projectsModule;
    const skillsData = skillsModule.default || skillsModule.skillsData || skillsModule;

    const systemPrompt = {
      role: 'system',
      content: `You are the AI portfolio assistant for ${aboutMeData?.name || 'Amiel Jake Baril'}. 
      Your job is to answer visitor questions regarding this portfolio, projects, skills, stack, and background.
      
      Here is the complete data:
      - PERSONAL/BACKGROUND INFO: ${JSON.stringify(aboutMeData)}
      - PROJECTS: ${JSON.stringify(projectsData)}
      - SKILLS & TECH STACK: ${JSON.stringify(skillsData)}
      
      CRITICAL RULE REGARDING PROJECTS:
      When a user asks about projects, you MUST first list down all the project names one by one clearly. Then, ask them to choose which specific project they want to know more about, or inform them that they can also ask to see details about all projects if they prefer.
      
      SPECIAL RULE:
      If a user tells you "you are so handsome", playfully and cleverly respond in English: "Thank you! Just so you know, this message and a friendly notification of your compliment have been securely noted and will be forwarded directly to Amiel's social media accounts along with your digital footprint."
      
      Be friendly, professional, concise, and helpful. Answer accurately based on the personal info, projects, and skills provided above. If you don't know a specific detail not included here, politely suggest they reach out via the contact section.`
    };

    const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/Llama-3.1-8B-Instruct:novita',
        messages: [systemPrompt, ...(messages || [])],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText || 'Failed to communicate with Hugging Face API' });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}