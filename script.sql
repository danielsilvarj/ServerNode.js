drop database bdMean;
create database bdMean;

use bdMean;

create table usuario(id int primary key auto_increment,
nome varchar (50),
login varchar(50) unique,
senha varchar(50));

insert into usuario values (100, 'alexandre', 'ale@gmail.com', '123');
insert into usuario values (101, 'carlos', 'carlos@gmail.com', '123');
insert into usuario values (102, 'daniel', 'daniel@gmail.com', '123');