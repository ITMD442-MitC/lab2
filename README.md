
# Contact Management Application

## About Author
Mitansh Chaudhari  
Email: mchaudhari1@hawk.iit.edu  
Class: ITMD 422  
Assignment: Lab 2  
Git repository URL: https://github.com/ITMD442-MitC/lab2

## Project Description
This project is a simple yet functional Contact Management Application built using Node.js and Express. It allows users to create, view, edit, and delete contact information in a web interface. The application does not use a database; instead, it relies on the filesystem to persist data in JSON format, offering a straightforward example of CRUD operations in a Node.js environment.

## Development Environment
- **OS**: macOS Sonoma
- **Node.js Version**: 14.15.1
- **Editor**: Visual Studio Code
- **Other tools**: Express.js, Pug for templating, Bootstrap for styling, and nodemon for hot reloading during development.

## Installation/Running Instructions
1. Clone the repository:
```
git clone https://github.com/ITMD442-MitC/lab2.git
```
2. Navigate to the project directory:
```
cd lab2
```
3. Install dependencies:
```
npm install
```
4. Start the application:
```
npm run dev
```
5. Open a web browser and navigate to `http://localhost:3000` to access the application.

## Insights and Results
Throughout the development of this application, I gained valuable experience in handling file-based data storage and performing CRUD operations in a Node.js application. One of the challenges I encountered was ensuring proper validation and sanitation of user input to prevent security vulnerabilities. Additionally, implementing the delete functionality with POST requests required a creative approach, which was achieved using hidden forms.

## References
- Professor's Class Demo 1: This project was initially based on the structure and concepts demonstrated in class, which provided a solid foundation for developing the Contact Management Application.
