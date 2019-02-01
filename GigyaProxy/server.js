const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const qs = require('query-string');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.post('/login', (req, res, next) => {
  const { name, password } = req.body;
  console.log(JSON.stringify(req.body, null ,2));
  axios.post('https://accounts.us1.gigya.com/accounts.login', qs.stringify({
    apiKey: '3_9vuEJ9a3i5XPoWywK7UQpl9gV0RLbIvrgkQ1C-D3VwGTWNf_0EL_fvF8hd_sqlul',
    secret: 'vkUc9neUHXZHhI7LD6wW3S1RodZL3mWf/rFrM37tXZ4=',
    loginId: name,
    password: password,
  }))
    .then(response => response.data)
    .then(data => res.json(data))
    .catch(console.log);
});

app.post('/register', async (req, res, next) => {
  console.log(JSON.stringify(req.body, null ,2));
  const { regToken } = await axios.post('https://accounts.us1.gigya.com/accounts.initRegistration', qs.stringify({
    apiKey: '3_9vuEJ9a3i5XPoWywK7UQpl9gV0RLbIvrgkQ1C-D3VwGTWNf_0EL_fvF8hd_sqlul',
    secret: 'vkUc9neUHXZHhI7LD6wW3S1RodZL3mWf/rFrM37tXZ4=',
  }))
    .then(response => response.data)
    .catch(console.log);

  console.log('regtoken', regToken);
  
  const { name, password, email } = req.body;

  axios.post('https://accounts.us1.gigya.com/accounts.register', qs.stringify({
    apiKey: '3_9vuEJ9a3i5XPoWywK7UQpl9gV0RLbIvrgkQ1C-D3VwGTWNf_0EL_fvF8hd_sqlul',
    secret: 'vkUc9neUHXZHhI7LD6wW3S1RodZL3mWf/rFrM37tXZ4=',
    username: name,
    email: email,
    password: password,
    regToken: regToken,
    finalizeRegistration: true,
  })).then(response => response.data)
     .then(data => res.json(data))
     .catch(console.log);

});

app.post('/resolve', (req, res, next) => {
  const { url } = req.body;
  axios.get(url, { maxRedirects: 0 })
    .then(response => { 
      res.send(response.response.headers.location);
    })
    .catch(response => {
      res.send(response.response.headers.location); 
    })
});

app.listen(3000, function() {
  console.log('Server listening on port 3000');
});