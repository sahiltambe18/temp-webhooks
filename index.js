const express = require('express');


const app = express();


app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    console.log('GET request received');
    res.send('Hello World!');
})

app.post('/api', (req, res) => {

    const payload = JSON.parse(req.body.payload);
    const attachments = JSON.parse(payload.message.attachments);
    console.log('POST request received:', attachments);

    // Extract alert name from title
    const title = payload.message.attachments[0]?.title || '';
    const alertName = title.split(' ')[0]; // Basic parsing
    const duration = 60; // minutes

    console.log(`Alert Name: ${alertName}`);
    console.log("title", title);
    console.log("duration", duration);
    res.send('POST request received');
})


app.listen( process.env.PORT || 3000, ()=>{
    console.log('Server is running on port ', process.env.PORT || 3000);
})