import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import categoriesRouter from './category/router';
import wordsRouter from './word/router';
import usersRouter from './user/router';

const app = express();

app.use(bodyparser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('English for kids admin panel');
});

app.use('/api/categories/', categoriesRouter);
app.use('/api/words/', wordsRouter);
app.use('/api/users/', usersRouter);

app.listen(3000, () => {
  console.log('Server has been started on port 3000...');
});
