import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('English for kids admin panel');
});

app.listen(3000, () => {
  console.log('Server has been started on port 3000...');
});
