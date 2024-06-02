const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/api/auth/google', (req, res) => {
  // Handle Google authentication here
  res.send({ success: true });
});

app.post('/api/auth/email', (req, res) => {
  // Handle email authentication here
  res.send({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
