import path from 'path';
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
  res.send(`English for kids API<br><br>
  Can use:<br>
  <br>
  /api/categories/<br>
  /api/categories/NAME<br>
  /api/words/<br>
  /api/words/category=NAME<br>
  /api/words/NAME<br>
  /api/users/<br>
  <br>
  Also categories and users have update (PUT), create (POST) and delete (DELETE) methods.<br><br>
  RETURN TO SITE: <a href="https://rolling-scopes-school.github.io/holbootla-JSFE2021Q1/english-for-kids-base/">English for kids</a>
  `);
});

app.use('/api/categories/', categoriesRouter);
app.use('/api/words/', wordsRouter);
app.use('/api/users/', usersRouter);

app.listen(3000, () => {
  console.log('Server has been started on port 3000...');
});
