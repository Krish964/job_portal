# Use official Node.js LTS Alpine image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json for better layer caching
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of the application source code
COPY . .

# Expose the port your app will run on, default to 8000, override with env if needed
ENV PORT=8000
EXPOSE 8000

# Start your node server
CMD ["npm", "start"]
