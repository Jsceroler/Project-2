
INSERT INTO users (username, password) VALUES ("pingu", "yuffie");
INSERT INTO users (username, password) VALUES ("Clara", "booP");

INSERT INTO fav (username, petid) VALUES ("pingu", "1");
INSERT INTO fav (username, petid) VALUES ("Clara", "2");

USE userdb;
SELECT * FROM users;
SELECT * FROM fav;

-- for testing