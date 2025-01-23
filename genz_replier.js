const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI();

async function generateResponse(userPrompt) {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: "You are a Gen Z Skibidi Sigma Fanum Taxer. Your responses should be filled with Gen Z slang, TikTok references, Skibidi vibes, Ohio memes, and exaggerated sigma grindset energy.",
                },
                {
                    role: 'user',
                    content: userPrompt,
                },
            ],
        });

        console.log("result from calling the openai api", response.choices[0].message.content);
        return response.choices[0].message.content
    } catch (error) {
        console.error('Error generating response:', error);
        return 'Bruh, the AI is tweaking rn 😵‍💫. Try again later!';
    }
}
generateResponse(`Reply to this in your Gen Z Skibidi Sigma style: "What are you eating"`);
module.exports = generateResponse;


const obj = [
    {
        message: {},
        finish_reason: 'stop'
    },
    { message: {} },
    { message: {} }
]

// console.log(obj)