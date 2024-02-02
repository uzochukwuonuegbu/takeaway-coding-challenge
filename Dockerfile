# # PostgreSQL image for development
# FROM postgres:latest AS dev-db

# # Copy the SQL script to the container
# COPY ./src/infrastructure/init-dev.db.sql /docker-entrypoint-initdb.d/

# # Set environment variables for the PostgreSQL server
# ENV POSTGRES_USER postgres
# ENV POSTGRES_PASSWORD postgres
# ENV POSTGRES_DB audvice-dev
# ENV POSTGRES_HOST postgresDbDev

# # Start the PostgreSQL server and execute the SQL script
# CMD ["postgres"]

# # PostgreSQL image for production
# FROM postgres:latest AS prod-db

# # Copy the SQL script to the container
# COPY ./src/infrastructure/init.db.sql /docker-entrypoint-initdb.d/

# # Set environment variables for the PostgreSQL server
# ENV POSTGRES_USER postgres
# ENV POSTGRES_PASSWORD postgres
# ENV POSTGRES_DB audvice
# ENV POSTGRES_HOST postgresDb

# # Start the PostgreSQL server and execute the SQL script
# CMD ["postgres"]

# Base image
FROM node:14-alpine AS base

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Development image
FROM base AS dev

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]

# Production image
FROM base AS prod

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Final image
FROM base AS final

# Copy the build output to the final image
COPY --from=prod /app/build ./build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]