# 1. Base Image: Use a Node image that supports crypto operations
FROM node:20

# 2. Install system dependencies for crypto operations
RUN apt-get update && apt-get install -y openssl

# 3. Working Directory
WORKDIR /app

# 4. Copy Dependencies
COPY package*.json ./

# 5. Install Dependencies
RUN npm install

# 6. Copy Source Code
COPY . .

# 7. Expose Port
EXPOSE 5000

# 8. Command
CMD ["npm", "run", "dev"]