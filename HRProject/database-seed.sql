CREATE TABLE employees
(
    id SERIAL,
    login text,
    token text,
    password_digest text,
    fixed boolean DEFAULT false,
    dismiss_date date,
    CONSTRAINT employees_pkey PRIMARY KEY (id)
    
);


CREATE TABLE people
(
    id SERIAL,
    name text,
    patronymic text,
    surname text,
    email text,
    workphone text, 
    phone text, 
    comment text,
    isemployee boolean,
    CONSTRAINT person_pkey PRIMARY KEY (id)
);

/* INSERT INTO employees(name, title) VALUES
 ('Meadow Crystalfreak ', 'Head of Operations'),
 ('Buddy-Ray Perceptor', 'DevRel'),
 ('Prince Flitterbell', 'Marketing Guru'); */