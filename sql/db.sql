DROP DATABASE IF EXISTS dan;
CREATE DATABASE dan;
ALTER DATABASE dan OWNER TO postgres;
\c dan;

DROP TABLE IF EXISTS dan_user;
CREATE TABLE IF NOT EXISTS dan_user (
  id serial PRIMARY KEY,
  name VARCHAR(40) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO dan_user (name, email)
VALUES
    ('John', 'john@gmail.com'),
    ('Jane', 'jane@hotmail.com'),
    ('Jim', 'james@yahoo.net');

DROP TABLE IF EXISTS role;
CREATE TABLE IF NOT EXISTS role (
  id serial PRIMARY KEY,
  name VARCHAR(40) UNIQUE NOT NULL,
  description VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO role (name, description) 
VALUES
  ('ROLE_USER', 'User'),
  ('ROLE_ADMIN', 'Admin'),
  ('ROLE_SUPER_ADMIN', 'Super Admin'),
  ('ROLE_MEMBER', 'Member');

DROP TABLE IF EXISTS user_role;
CREATE TABLE IF NOT EXISTS user_role (
  user_id BIGINT NOT NULL,
  role_id BIGINT NOT NULL,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO user_role(user_id, role_id) 
VALUES
  ((SELECT id FROM dan_user WHERE email='john@gmail.com'),(SELECT id FROM role WHERE name='ROLE_USER')),
  ((SELECT id FROM dan_user WHERE email='jane@hotmail.com'),(SELECT id FROM role WHERE name='ROLE_USER')),
  ((SELECT id FROM dan_user WHERE email='jane@hotmail.com'),(SELECT id FROM role WHERE name='ROLE_ADMIN')),
  ((SELECT id FROM dan_user WHERE email='jane@hotmail.com'),(SELECT id FROM role WHERE name='ROLE_SUPER_ADMIN')),
  ((SELECT id FROM dan_user WHERE email='james@yahoo.net'),(SELECT id FROM role WHERE name='ROLE_MEMBER'));