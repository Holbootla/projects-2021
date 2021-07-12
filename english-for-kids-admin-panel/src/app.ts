import express from 'express';
import categoriesRouter from './category/router';

const app = express();

app.get('/', (req, res) => {
  res.send('English for kids admin panel');
});

app.use('/api/categories/', categoriesRouter);

app.listen(3000, () => {
  console.log('Server has been started on port 3000...');
});
