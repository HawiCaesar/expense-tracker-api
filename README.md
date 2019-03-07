# Expense Tracker API

An API that helps you log expenses and categorize them

## Dependencies

This is a node.js app that depends on the following technologies.

[**Express.js**](https://expressjs.com/): A Fast, opinionated, minimalist web framework for node which was used in routing this application.

[**BodyParser**](https://babeljs.io/): This module was used to collect search data sent from the client side to the routing page.

[**Sequelize**](https://www.sequelizejs.com): Sequelize is a promise-based Node.js ORM for Postgres Server which is the database server for the app. It features solid transaction support, relations, read replication and more.

[**Postgresql**](https://www.postgresql.org/): PostgreSQL is a powerful, open source object-relational database system.

## Pre requisites & Installation

### Pre requisites

- Install (if not installed)
  - nodejs
  - postgresql
  - sequelize-cli (install this globally)

### Installation

1. Navigate to the directory you want it installed to. cd your folder
2. Clone the repository `https://github.com/HawiCaesar/expense-tracker-api.git`.
3. Create 2 databases(test and development) with PostgreSQL.
4. Open the expense-tracker-api folder.
5. Create a .env file using the .env.example as a guide.
6. `yarn install` to install all dependencies.
7. `yarn start:dev` to start the app in development mode.
8. `yarn test` runs all the tests.
9. The app runs on port 8000

## Features of the API
- A user can create an expense category
- A user can update an expense category
- A user can list expense cateogries
- A user can read on expense cateogry
- A user can create an expense
- A user can update an expense
- A user can delete an expense
