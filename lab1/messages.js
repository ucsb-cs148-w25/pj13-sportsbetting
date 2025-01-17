const messages = require('./messages');
app.get('/', (req, res) => {
    res.send(messages.home);
   });
   app.get('/about', (req, res) => {
    res.send(messages.about);
   });
   app.use((req, res) => {
    res.status(404).send(messages.notFound);
});