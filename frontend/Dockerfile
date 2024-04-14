# Use the official Node.js runtime as the base image
FROM node:18 as builder

# Set the working directory in the container
WORKDIR /app

ARG VITE_BACKEND_API
ARG VITE_MP_PUBLIC_KEY

# Set environment variables during the build process
ENV VITE_BACKEND_API=$VITE_BACKEND_API
ENV VITE_MP_PUBLIC_KEY=$VITE_MP_PUBLIC_KEY



# Copy package.json and package-lock.json to the working directory
COPY package*.json /app/

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the entire application code to the container
COPY ./ /app/

# Build the React app for production
RUN npm run build


# Use Nginx as the production server
FROM nginx:alpine

# Copy the ngnix.conf to the container
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app to Nginx's web server directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]