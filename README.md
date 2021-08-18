CREATE DATABASE timelog;

\c timelog;

CREATE TABLE Users(
"employee_id" SERIAL NOT NULL UNIQUE PRIMARY KEY,
"first_name" varchar,
"last_name" varchar,
"is_clocked_in" boolean,
"rate" money,
"auth_hash" varchar NOT NULL,
"is_manager" boolean NOT NULL);

CREATE TABLE Time_Table(
"sign_in_id" SERIAL NOT NULL UNIQUE PRIMARY KEY,
"employee_id" int REFERENCES Users("employee_id") ON UPDATE CASCADE ON DELETE CASCADE,
"clock_in" timestamp,
"clock_out" timestamp);