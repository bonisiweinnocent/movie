CREATE TABLE users(
id serial not null primary key,
firstName text ,
lastName text ,
username text not null,
password text not null
);



 create table user_playlist (id serial not null primary key,
user_id int,
movie_list text,
foreign key (user_id) references users(id)
);