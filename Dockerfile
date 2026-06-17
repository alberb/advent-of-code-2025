FROM python:3.11-slim

WORKDIR /app

# Copy the entire repository
COPY . .

# Install any Python dependencies if needed
RUN pip install --no-cache-dir -r requirements.txt 2>/dev/null || echo "No requirements.txt found"

# Set the default command to run the solutions
CMD ["python", "-c", "print('Advent of Code 2025 Solutions - Ready to run')"]
