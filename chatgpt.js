
require("dotenv").config();
const TelegramBot = require('node-telegram-bot-api');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const token = process.env.botid;
const bot = new TelegramBot(token, {polling: true});


bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; 
  bot.sendMessage(chatId, resp);
});


bot.on('message',async (msg) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: msg.text,
    max_tokens: 100,
    temperature: 0.8,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  
  console.log(msg.text)
  const chatId = msg.chat.id;
  const responseon =  response.data.choices[0].text
  console.log(response.data.choices);
  bot.sendMessage(chatId, responseon);
});