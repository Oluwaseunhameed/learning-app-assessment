import express from 'express';
import { Pool } from 'pg';

const app = express();
const port = 4000;

// Middleware
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
