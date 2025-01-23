//zimport OpenAI from "openai";
const OpenAI = require("openai");
//const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

// Initialize OpenAI API
//const configuration = new Configuration({
// apiKey: process.env.OPENAI_API_KEY, // Your OpenAI API Key
//});

// const openai = new OpenAIApi(configuration);

// async function getEmojiSuggestion(messageContent) {
// try {
//   const gptResponse = await openai.createChatCompletion({
//     model: 'gpt-4',
//     messages: [
//       { role: 'system', content: 'You are an assistant that suggests emojis for messages.' },
//       { role: 'user', content: `Suggest an emoji for this message: "${messageContent}"` },
//     ],
//   });

//   // Extract and return GPT-4's suggestion
//   return gptResponse.data.choices[0].message.content.trim();
// } catch (error) {
//   console.error('Error with GPT-4 API:', error);
//   throw error;
// }
//}

async function getEmojiSuggestion(messageContent) {
  const openai = new OpenAI();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: `Give me an emoji for this Discord message: "${messageContent}". Give just the emoji and nothing else`,
      },
    ],
  });
  console.log("completion", completion);
  console.log("completion.choices.messages", completion.choices[0].message.content);
  //console.log(completion.choices[0].message);
  return completion.choices[0].message.content
}
getEmojiSuggestion("idk");
module.exports = { getEmojiSuggestion };
