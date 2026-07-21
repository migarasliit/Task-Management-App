# 1. Base Image: Use Node.js for building and running
FROM node:20

# 2. Working Directory
WORKDIR /app

# 3. Copy Dependencies
COPY package*.json ./

# 4. Install Dependencies
RUN npm install

# 5. Copy Source Code
COPY . .

# 6. Expose Port: Vite runs on 5173 by default
EXPOSE 5173

# 7. Command: Start the Vite dev server
# We add --host to allow access from outside the container
CMD ["npm", "run", "dev", "--", "--host"]