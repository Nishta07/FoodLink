FROM python:3.11-slim

# Install prerequisites and Node 20 (nodesource)
RUN apt-get update && apt-get install -y curl build-essential ca-certificates gnupg2 lsb-release && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy app files
COPY . /app

# Install Python ML dependencies
WORKDIR /app/ml-service
# use the requirements file you already have
RUN pip install --no-cache-dir -r requirements_ml.txt

# Install backend production dependencies
WORKDIR /app/backend
RUN if [ -f package-lock.json ]; then npm ci --only=production; else npm install --only=production; fi

# Install frontend dependencies (needed to run npm run build in start.sh)
WORKDIR /app
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Expose ports
EXPOSE 5000 8000

# Make start script executable and run it
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

ENV PORT=5000
CMD ["/app/start.sh"]
