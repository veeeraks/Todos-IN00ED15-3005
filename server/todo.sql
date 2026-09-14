drop table if exists tasks;
drop table if exists account;
create table tasks (
 id serial primary key,
 description varchar(255) not null
);
create table account (
 id serial primary key,
 email varchar(50) not null unique,
 password varchar(255) not null
);
insert into tasks (description) values
('Complete the project documentation'),
('Review the code changes'),
('Prepare for the team meeting'),
('Update the project timeline'),
('Test the new features'),
('Fix the reported bugs'),
('Deploy the application to production'),
('Conduct a code review with peers');

SELECT * FROM tasks;

