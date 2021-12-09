DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id serial PRIMARY KEY NOT NULL,
    title varchar(100) NOT NULL,
    content varchar(400) NOT NULL,
    name varchar(100) NOT NULL
);