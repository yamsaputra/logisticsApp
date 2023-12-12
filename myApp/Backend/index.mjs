import express from 'express';
import cors from 'cors'; // Cross Origin Resource Sharing, to allow requests from other domains and allow the front and backend to be on the same domain.

const app = express();

app.use(cors({
  origin: 'http://localhost:8100',
  credentials: true,
}));

app.get('/person', (req, res) => {
  const person = {
    name: 'Chris P. Chips',
    gender: 'Male',
    age: 25,
    email: 'chips@chrisp.com',
    phone: '10-1010-1010',
    location: 'Brandenburg an der Havel, Germany'
  };
  res.json(person);
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
