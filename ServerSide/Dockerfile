# Use official Node LTS image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the source code
COPY . .

# Build step (optional - if you have build scripts, otherwise remove)
# RUN npm run build

# Expose the port your app listens on (use environment variable fallback)
ENV PORT=8000
EXPOSE 8000

# Start the server
CMD ["npm", "start"]
