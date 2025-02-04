# Node.js image & version
FROM node:23.1.0

# Working directory
WORKDIR /frontendApp

# Install dependencies
# Copy package.json and package-lock.json
COPY package*.json ./

# Building code for production
# RUN npm ci --only=production
RUN npm install

# Copy the rest of the application code/Bundle app source.
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD ["npm", "start"]