import express from 'express';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

let userIsAuthorized = false;
const passwordCheck = function (req, res, next) {
  const password = '123abc';
  const submit_password = req.body['password'];
  if (password === submit_password) {
    userIsAuthorized = true;
  }
  next();
};
app.use(passwordCheck);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/views/index.html');
});

app.post('/submit', (req, res) => {
  if (userIsAuthorized) {
    return res.sendFile(__dirname + '/public/views/secrets.html');
  }

  res.redirect('/');
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
