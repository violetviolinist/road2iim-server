const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/road2iim-server/webhooks', (req, res) => {
    console.log('Webhook received:', req.body);
    const eventData = req.body;
    
    if (eventData && eventData.event === 'payment.captured') {
      if (eventData && eventData.payload && eventData.payload.payment && eventData.payload.payment.entity) {
        const email = eventData.payload.payment.entity.email;
        console.log('Email from webhook:', email);
        res.sendStatus(200);
        return
      } else {
          console.log('Invalid webhook data structure', eventData);
      }
    }

    res.sendStatus(500);
});

const PORT = 8082;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
