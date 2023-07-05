# Store

The application is fully written using Node.js technology and is designed for creating new products, clients, and connecting these two objects.

The application features:

- Server-side and client-side verification.
  
- Authentication, with the exception that there is no possibility of registration from the beginning. First, you need to log in, and then you can create a new order (Purchase) where you need to provide all the necessary data. After logging out, you can log in to a new account. Accounts do not have types.
  
- Internationalization, which I must admit does not work fully well.
  
To run the application, you first need to create a MySQL database using the command "CREATE SCHEMA IF NOT EXISTS tin-store-sequelize", which is also provided in the application config/sequelize/schema.sql file.
Before running, you also need to install the "node_modules" folder using the command "npm i". Then, you can start the application using the command "npm start".

To log in for the first time, please use:
Email: name@gmail.com
Password: 12345
