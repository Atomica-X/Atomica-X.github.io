exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, message } = JSON.parse(event.body);
    
    const BOT_TOKEN = '8886928269:AAEFcX-kZVteaIZTGQ9DyAfyjCB3fLbjl34';
    const CHAT_ID = '8294215150';
    
    const text = `📩 Новое сообщение с сайта ATOMICA:\n\n👤 Имя: ${name}\n📧 Email: ${email}\n📝 Сообщение: ${message}`;
    
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Сообщение отправлено' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Ошибка при отправке' }),
    };
  }
};
