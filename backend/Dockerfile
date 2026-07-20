# 1. Base Image: Use a lightweight Node.js image
   FROM node:18-alpine

 # 2. Working Directory: Set the folder inside the container
   WORKDIR /app

  # 3. Copy Dependencies: Copy package.json first (for better caching)
   COPY package*.json ./

   # 4. Install Dependencies: Run npm install inside the container
   RUN npm install

   # 5. Copy Source Code: Copy the rest of the backend code
   COPY . .

   # 6. Expose Port: Tell Docker the container listens on port 5000
   EXPOSE 5000

   # 7. Command: Start the server
   CMD ["npm", "run", "dev"]