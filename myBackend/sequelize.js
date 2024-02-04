import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';

// Set up a new database connection
const sequelize = new Sequelize('user_db', 'Yama', 'Redcharmander98', {
    host: 'localhost',
    dialect: 'mysql'
});

// Define the user model
const User = sequelize.define('user', {
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
});

// Sync the model with the database
User.sync()

// Create a new user
async function register(firstName, lastName, age, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({firstName, lastName, age, email, password: hashedPassword });
}

export { register };