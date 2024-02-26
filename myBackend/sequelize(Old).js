import Sequelize from "sequelize";

// Set up a new database connection
const sequelize = new Sequelize("flyer_db", "Yama", "Redcharmander98", {
  host: "localhost",
  dialect: "mysql",
});

// Define the user model
const User = sequelize.define(
  "User",
  {
    firstName: {
      type: Sequelize.STRING(45), // VARCHAR(45)
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING(45), // VARCHAR(45)
      allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER, // VARCHAR(45)
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(45), // VARCHAR(45)
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(60), // VARCHAR(45)
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// Sync the model with the database
User.sync({ alter: true })
  .then(() => {
    console.log("User model synchronized with the database.");
  })
  .catch((error) => {
    console.error("Error synchronizing User model:", error);
  });

// Create a new user
async function register(firstName, lastName, age, email, hashedPassword) {
  try {
    const newUser = await User.create({
      firstName,
      lastName,
      age,
      email,
      password: hashedPassword,
    });
    console.log("User created successfully. Yeyuh!", newUser);
    return true;
  } catch (error) {
    // Check if the error is due to a unique constraint violation (user already exists)
    if (error.name === "SequelizeUniqueConstraintError") {
      console.log("User already exists.");
      return { success: false, message: "User already exists." };
    } else if (error.name === "SequelizeValidationError") {
      console.error("Validation error creating user:", error);
      return { success: false, message: "Validation error creating user." };
    } else if (error.name === "SequelizeDatabaseError") {
      console.error("Database error creating user:", error);
      return { success: false, message: "Database error creating user." };
    } else {
      console.error("Error creating user:", error);
      return { success: false, message: "Error creating user." };
    }
  }
}
export { register, User };
