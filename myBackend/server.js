import express from 'express';
import cors from 'cors'; // Cross Origin Resource Sharing, to allow requests from other domains and allow the front and backend to be on the same domain.
import { registerUser, loginUser } from './registerUser.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:8100',
  credentials: true,
}));

app.use(express.json());

// registerUser function hosting.
app.use('/api', registerUser);

app.post('/api/login', loginUser);

/* app.get('/person', (req, res) => {
  const person = {
    name: 'Chris P. Chips',
    gender: 'Male',
    age: 25,
    email: 'chips@chrisp.com',
    phone: '10-1010-1010',
    location: 'Brandenburg an der Havel, Germany'
  };
  res.json(person);
}); */

/* app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
}); */

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});

