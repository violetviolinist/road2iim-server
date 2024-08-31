const express = require('express');
const bodyParser = require('body-parser');
const { Resend } = require('resend');

const resendClient = new Resend(process.env.RESEND_API_KEY);

const app = express();
app.use(bodyParser.json());

app.post('/road2iim-server/webhooks', async (req, res) => {
    const eventData = req.body;
    
    if (eventData && eventData.event === 'payment.captured') {
      if (eventData && eventData.payload && eventData.payload.payment && eventData.payload.payment.entity) {
        const email = eventData.payload.payment.entity.email;

        const { error } = await resendClient.emails.send({
          from: 'mail@road2iim.info',
          to: email,
          subject: 'Your purchase of the Road2IIM planner was successful! Here\'s your planner.',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
              <h1 style="color: #4a4a4a;">Ready to conquer CAT 2024? 📚🎯</h1>
              <p>Our Road2IIM Planner is your ultimate study companion!</p>
              <ul>
                <li>Track your progress</li>
                <li>Analyze past papers</li>
                <li>Stay on top of your game</li>
              </ul>
              <p>All with a planner crafted by IIM Kozhikode students. 🚀</p>
              <p><strong>Let's turn your CAT dreams into reality!</strong></p>
              <p>Visit our website: <a href="https://road2iim.info/" style="color: #007bff;">https://road2iim.info/</a></p>
              <p>Access your planner here: <a href="https://docs.google.com/spreadsheets/d/1afb7gVcKNGx7RLduy9m3aWqoZ6vLhTPL_l-CPCdwOFU/copy?usp=sharing" style="color: #007bff;">Road2IIM Planner</a></p>
              <p>Thank you for purchasing, all the best for CAT 2024 💯</p>
            </div>
          `,
        });
        
        if (error) {
          console.log(error);
        }

        res.sendStatus(200);
        return
      } else {
          console.log('Invalid webhook data structure', eventData);
      }
    }

    console.log("failed", req.body)
    res.sendStatus(500);
});

const PORT = 8082;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
