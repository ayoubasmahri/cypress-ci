# Use official Cypress base image with Node.js 18
FROM cypress/included:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies first
COPY package*.json ./

# Install dependencies (Cypress & Allure)
RUN npm install

# Copy the entire project into the container
COPY . .

# Set environment variables for Allure
ENV CYPRESS_ALLURE_RESULTS_PATH=/app/allure-results
ENV ALLURE_OUTPUT_DIR=/app/allure-report

# Install Allure Command-Line Tool
RUN npm install -g allure-commandline --save-dev

# Run Cypress tests and generate the Allure report
CMD ["sh", "-c", "npx cypress run --env allure=true && allure generate --clean --output ${ALLURE_OUTPUT_DIR} ${CYPRESS_ALLURE_RESULTS_PATH}"]
