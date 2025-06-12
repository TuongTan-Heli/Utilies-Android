# Use Node.js base image
FROM node:18

# Install Firebase CLI
RUN npm install -g firebase-tools

# Set work directory
WORKDIR /usr/src/app

# Copy functions and config
COPY . .

# Install dependencies
RUN npm install

# Expose emulator ports
EXPOSE 4000 5001 8080 9000 9099 9199

# Start Firebase Emulator
CMD ["firebase", "emulators:start", "--only", "functions"]
