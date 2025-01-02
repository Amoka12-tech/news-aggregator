# Base image for Node.js
FROM node:18-alpine as build

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire React app into the container
COPY . ./

# Build the React app
RUN npm run build

# Use a lightweight web server for serving static files
FROM nginx:1.25-alpine

# Copy the build output to Nginx's html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the application
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
