const path = require('path');
const express = require('express');
const cors = require('cors');

const server = express();

server.use(cors());

server.use(express.static('build'));

server.get('*', (req, res) => {
  const htmlPath = path.resolve(__dirname, 'build', 'index.html');
  res.sendFile(htmlPath);
});

const port = process.env.PORT || 4242;
server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
