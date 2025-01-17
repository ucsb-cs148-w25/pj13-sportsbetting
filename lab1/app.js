const express = require('express');
const app = express();

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});