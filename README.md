Backend Projet already deployed(https://vercel.com/edut23s-projects/todo-mosaicq-api/2EwXS3MRvYYbaJV5c6wtLZ5X6P2h), works with https://github.com/edut23/ToDoList
Made with Node and PostgreeSQL

To run local, create the database with these
SQL Scripts:

`CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL
);`

`CREATE TABLE item (
    itemId SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    creation TIMESTAMP NOT NULL
);`

Install node packages with `npm install`

And use `node start` in the folder application on terminal.


