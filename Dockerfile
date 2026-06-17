FROM python:3.11-slim

WORKDIR /app

# Copy the repository contents
COPY . .

# Set the default command to run a Python shell
# Users can override this to run specific scripts
CMD ["python", "-i", "-c", "print('Advent of Code 2025 Solutions'); print('Run scripts with: python day<N>/part<M>.py')"]
