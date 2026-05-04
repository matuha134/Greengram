const express = require('express');
const app = express();
app.use(express.json());

let messages = [];
const MAX_MSGS = 40;

// Отдаём HTML-клиент
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Получить сообщения
app.get('/messages', (req, res) => {
  res.json(messages);
});

// Отправить сообщение
app.post('/send', (req, res) => {
  const { text, sender } = req.body;
  if (!text || !sender) return res.status(400).json({ error: 'text and sender required' });
  const msg = {
    id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
    text,
    sender,
    timestamp: Date.now()
  };
  messages.push(msg);
  if (messages.length > MAX_MSGS) messages = messages.slice(-MAX_MSGS);
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Chat running on port ' + PORT));
