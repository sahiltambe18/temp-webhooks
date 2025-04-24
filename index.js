const express = require('express');


const app = express();


app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    console.log('GET request received');
    res.send('Hello World!');
})

app.post('/api', (req, res) => {
    console.log('POST request received', req.body);
    res.send('POST request received');
})


app.listen( process.env.PORT || 3000, ()=>{
    console.log('Server is running on port ', process.env.PORT || 3000);
})