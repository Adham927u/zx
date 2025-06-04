const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { Telegraf } = require('telegraf');

const bot = new Telegraf("7845128010:AAEi4cEprUbzz8FeVZ0AN7IQN7YdLeCOhxA");
const chatId = "6272162286";

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
  console.log('امسح الكود من واتساب');
});

client.on('ready', () => {
  console.log('بوت واتساب جاهز');
});

const sentNumbers = new Set();

client.on('message_reaction', async (reaction) => {
  try {
    const number = reaction.user.split('@')[0];
    if (!sentNumbers.has(number)) {
      sentNumbers.add(number);
      await bot.telegram.sendMessage(chatId, `رقم متفاعل: +${number}`);
    }
  } catch (error) {
    console.error('خطأ في إرسال الرقم:', error);
  }
});

client.initialize();
bot.launch();
