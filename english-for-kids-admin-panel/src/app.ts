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

const publicPath = path.resolve(__dirname, '../wwwroot');
const indexPath = path.resolve(__dirname, '../wwwroot/index.html');

app.use(/^(?!\/api\/)/, express.static(publicPath));

app.use(/^(?!\/api\/)/, (req, res) => {
  res.sendFile(indexPath);
});

app.get('/api/', (req, res) => {
  res.send(`English for kids API<br><br>
  Can use:<br>
  <br>
  /categories/<br>
  /categories/NAME<br>
  /words/<br>
  /words/category=NAME<br>
  /words/NAME<br>
  /users/<br>
  <br>
  Also categories and users have update (PUT), create (POST) and delete (DELETE) methods.<br><br>
  RETURN TO SITE: <a href="../">English for kids</a>
  `);
});

app.use('/api/categories/', categoriesRouter);
app.use('/api/words/', wordsRouter);
app.use('/api/users/', usersRouter);

app.listen(3000, () => {
  console.log('Server has been started on port 3000...');
});
