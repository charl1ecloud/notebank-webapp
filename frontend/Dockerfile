FROM node:latest

# Set the working directory to /app
WORKDIR /app

COPY package.json /app

RUN npm install --silent

# Copy the current directory contents into the container at /app
COPY . /app

# Expose the port the app will run on
EXPOSE 3000

# Define the command to run the app when the container launches

CMD ["npm", "start"]