const express = require('express');

const app = express();

app.use(express.static('./dist/kellisprep'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/kellisprep/'}),
);

app.listen(process.env.PORT || 8080);
