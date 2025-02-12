# Use official Cypress base image with Node.js 18
FROM cypress/included:latest

# Set the working directory inside the container
RUN mkdir /app

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies first
COPY package*.json ./

COPY . .
# Install dependencies (Cypress & Allure)
RUN npm install

# Copy the entire project into the container


# Set environment variables for Allure
# Install Allure Command-Line Tool
RUN npm install -g allure-commandline --save-dev

# Run Cypress tests and generate the Allure report
ENTRYPOINT ["npx","cypress","run"]
#With CMD in this case, we can specify more parameters to the last entrypoint.
CMD [""]