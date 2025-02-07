// Framework import statements.
import Sequelize from "sequelize";
import dotenv from "dotenv";

// Loads environment variables from the .env file.
dotenv.config();

// Database connection/configuration.
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
  dialectOptions: {
    connectTimeout: 60000,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

async function syncModels() {
  try {
    await sequelize.sync({ alter: true });
    console.log('Models synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing models:', error);
  }
}

syncModels();

// Define the user model
const User = sequelize.define(
  "users",
  {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fname: {
      type: Sequelize.STRING(45), // VARCHAR(45)
      allowNull: false,
    },
    lname: {
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
    dateJoined: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    rating: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

// Define the ride model.
const Ride = sequelize.define(
  "rides",
  {
    ride_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    origin: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    destination: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    time: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// Define the book model.
const Book = sequelize.define(
  "user_has_rides",
  {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    ride_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    is_sender: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// Sync the models with the database.
User.sync({ alter: true })
  .then(() => {
    console.log("User model synchronized with the database.");
  })
  .catch((error) => {
    console.error("Error synchronizing User model:", error);
  });

Ride.sync({ alter: true })
  .then(() => {
    console.log("Ride model synchronized with the database.");
  })
  .catch((error) => {
    console.error("Error synchronizing Rides model:", error);
  });

Book.sync({ alter: true })
  .then(() => {
    console.log("Book model synchronized with the database.");
  })
  .catch((error) => {
    console.error("Error synchronizing Book model:", error);
  });

User.belongsToMany(Ride, { through: Book, foreignKey: "user_id" });
Ride.belongsToMany(User, { through: Book, foreignKey: "ride_id" });
Book.belongsTo(Ride, { foreignKey: "ride_id" });
Book.belongsTo(User, { foreignKey: "user_id" });

// Retry the user has rides Transaction

async function alterTable() {
  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    try {
      await sequelize.query(
        "ALTER TABLE `user_has_rides` CHANGE `createdAt` `createdAt` DATETIME NOT NULL;"
      );
      console.log("Table altered successfully");
      break;
    } catch (error) {
      if (error.original && error.original.code === "ER_LOCK_DEADLOCK") {
        attempts++;
        console.warn(
          `Deadlock detected. Retrying ${attempts}/${maxAttempts}...`
        );
        if (attempts === maxAttempts) {
          console.error("Max attempts reached. Could not alter table.");
          throw error;
        }
      } else {
        console.error("An error occurred:", error);
        throw error;
      }
    }
  }
}

alterTable().catch((err) => {
  console.error("Failed to alter table:", err);
});

// Create a new user
async function register(fname, lname, age, email, hashedPassword) {
  try {
    const newUser = await User.create({
      fname,
      lname,
      age,
      email,
      password: hashedPassword,
    });
    console.log("User created successfully. Yeyuh!", newUser);
    return true;
  } catch (error) {
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

// Create a new ride
async function registerRouteDB(bringDataBE) {
  try {
    const bringDataDB = {
      origin: bringDataBE.origin,
      destination: bringDataBE.destination,
      date: new Date(bringDataBE.date),
      time: bringDataBE.time,
      price: parseFloat(bringDataBE.price),
      description: bringDataBE.description,
      email: bringDataBE.email,
    };

    const newRide = await Ride.create({
      origin: bringDataDB.origin,
      destination: bringDataDB.destination,
      date: bringDataDB.date,
      time: bringDataDB.time,
      price: bringDataDB.price,
      description: bringDataDB.description,
      email: bringDataDB.email,
    });

    console.log("Ride created successfully. Yeyuh!", newRide);
    const newRideID = newRide.dataValues.ride_id;
    return newRideID;
  } catch (error) {
    console.error("Error creating ride:", error);
    return false;
  }
}

export { User, Ride, Book, register, registerRouteDB };
