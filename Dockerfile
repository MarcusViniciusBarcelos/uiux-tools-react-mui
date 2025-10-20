FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY index.js ./

# Make executable
RUN chmod +x index.js

# Set user to non-root for security
USER node

# Run the server
CMD ["node", "index.js"]
