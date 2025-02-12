# Use OpenJDK as the base image
FROM openjdk:21-jdk-slim

# Set working directory inside the container
WORKDIR /app

# Copy the JAR file from the target directory into the container
COPY target/backend-0.0.1-SNAPSHOT.jar emailreply.jar

# Expose the application port (change if needed)
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "emailreply.jar"]

