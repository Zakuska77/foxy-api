const express = require('express');
const app = express();

const user = require('./router/userRouter');
const auth = require('./router/authRouter');
const languages = require('./router/languageRoute');
const facts = require('./router/factsRoute');
const levels = require('./router/levelRouter');
const questions = require('./router/questionRouter');

app.use('/user', user);
app.use('/', auth);
app.use('/languages', languages);
app.use('/facts', facts);
app.use('/levels', levels)
app.use('/questions', questions);

app.listen(3000, () => {
   console.log('Server is running on http://localhost:3000');
});