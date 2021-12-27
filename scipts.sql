CREATE TABLE authors (

    id serial PRIMARY KEY,
    name varChar(64) NOT NULL

);

CREATE TABLE posts (

    id serial PRIMARY KEY,
    author_id INTEGER NOT NULL references authors(id),
    title varChar(64) NOT NULL,
    description varChar(255) NOT NULL,
    category varChar(64) NOT NULL
  
);
