const express = require('express');
const AlertHelper = require('./alerthelper');
const { default: AlertManager } = require('./alerthelper');

const app = express();


app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    console.log('GET request received');
    res.send('Hello World!');
})

app.post('/api', async (req, res) => {
    res.status(200).send('');
    const payload = JSON.parse(req.body.payload);
    const attachments = payload.message.attachments;
    console.log('POST request received:', attachments);

    // Extract alert name from title
    const alertName = payload.message.attachments[0]?.title || '';
    // const alertName = title.split(' ')[0]; // Basic parsing
    const duration = 60*6; // minutes



    console.log(`Alert Name: ${alertName}`);
    await AlertManager.silence(alertName,duration)
    console.log("duration", duration);
    // res.json({
    //     response_type: 'ephemeral',
    //     text: ` Silenced alert *${alertName}* for ${duration} minutes.`
    //   });
})


app.listen( process.env.PORT || 3000, ()=>{
    console.log('Server is running on port ', process.env.PORT || 3000);
})