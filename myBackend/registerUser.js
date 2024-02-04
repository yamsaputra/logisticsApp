import express from 'express';

export const registerUser = express.Router();

registerUser.post('/register', async (req, res) => {
    const formData = req.body;
    
    console.log(registerData);

    try {
        const newUser = await UserActivation.create({ firstName, lastName, age, email, password });
        res.status(201).json(newUser);
    } catch {
        res.status(500).json({ error: 'Error creating user' });
    }
});
