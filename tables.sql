
CREATE TABLE users(
  id bigserial PRIMARY KEY,
  username VARCHAR (255) NOT NULL,
  password VARCHAR (255) NOT NULL,
  email VARCHAR (255) UNIQUE NOT NULL,
  created_on TIMESTAMP NOT NULL,
  fullname VARCHAR (255) NOT NULL,
  role VARCHAR (255) NOT NULL,
  secretToken VARCHAR (255) NOT NULL,
  active BOOLEAN NOT NULL
 );

 
 CREATE TABLE campaigns(
  id bigserial PRIMARY KEY,
  campaign_id serial NOT NULL,
  firstname VARCHAR (255) NOT NULL,
  lastname VARCHAR (255) NOT NULL,
  email VARCHAR (255) UNIQUE NOT NULL,
  gender VARCHAR (255) NOT NULL,
  date VARCHAR (255) NOT NULL,
  city VARCHAR (255) NOT NULL,
  fundgoal VARCHAR (255) NOT NULL,
  state VARCHAR (255) NOT NULL,
  party VARCHAR (255) NOT NULL,
  image VARCHAR (255) NOT NULL,
  position VARCHAR (255) NOT NULL,
  vision VARCHAR (255) NOT NULL,
  alias VARCHAR (255) NOT NULL,
  social text NOT NULL
 );

  CREATE TABLE endorsements(
  id bigserial PRIMARY KEY,
  endorsement VARCHAR (255) NOT NULL,
  username VARCHAR (255) NOT NULL,
  date VARCHAR (255) NOT NULL,
  endorsement_id serial NOT NULL
 );

