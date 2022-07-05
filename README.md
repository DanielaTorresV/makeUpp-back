# MakeUpp

## External Dependencies

To this project we need to install the next dependencies:

- Nodejs, bcryptjs, cors, dotenv, express, jsonwebtoken, mongoose and morgan.
- Development dependencie: Nodemon and cross-env

Besides you need the tool Postamn to test the requests.

To install all modules you need put in the terminal: npm install.

## How to Run the API

1. You need to register on the API and then you can use it, to the register you give a valid email besides a
   password, this must have at least a lowercase letter, a capital letter and a number. Its length must be a minimun of
   8 characters. Don´t forget this two parameters you need the same email and password when you are going to use the
   API again because it will be a Login.

Registro: http://localhost:8080/users/register
Ejm: {
"email" : "johndoe@gmail.com",
"password" : "Abcd12345"
}

Login: http://localhost:8080/users/login
Ejm: {
"email" : "johndoe@gmail.com",
"password" : "Abcd12345"
}

2. When you are logged, you have a token (AUTHORIZATION: Bearer token) with this you can use the next requests.

3. Following you see the requests that you can do:

   -

   4. Finalmente se hizo despliegue en heroku:
