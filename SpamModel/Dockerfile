# Use the official Python image as a base
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
COPY requirements.txt .

# Install any dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install TensorFlow
RUN pip install tensorflow==2.7.0

# Copy the Flask application code to the container
COPY . .

# Expose the port on which your Flask app runs
EXPOSE 5000

# Command to run the Flask application
CMD ["python", "app.py"]
