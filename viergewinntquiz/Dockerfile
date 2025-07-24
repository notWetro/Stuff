FROM node:20

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Use legacy-peer-deps to avoid native module resolution issues
RUN npm install --legacy-peer-deps && npm install rollup --force


# Copy all app files
COPY . .

# Expose Vite dev server port
EXPOSE 4000

# Start Vite in development mode
CMD ["sh", "-c", "npm run dev -- --host"]

