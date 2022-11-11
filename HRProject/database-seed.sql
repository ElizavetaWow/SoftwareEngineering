CREATE TABLE employee (
    personid             SERIAL,
    login                char(50) NOT NULL,
    token char(24) NOT NULL,
    password_digest char(4000) NOT NULL,
    workingononeproject  boolean DEFAULT false,
    grade_gradeid        INTEGER,
    dismiss_date             DATE
);

ALTER TABLE employee ADD CONSTRAINT employee_pk PRIMARY KEY ( personid );

CREATE TABLE grade (
    gradeid      SERIAL,
    name         char(1000 ) DEFAULT 'Грейд_N' NOT NULL,
    description  char(5000 )
);

ALTER TABLE grade ADD CONSTRAINT grade_pk PRIMARY KEY ( gradeid );

CREATE TABLE leave (
    leaveid          SERIAL,
    isvacation       boolean DEFAULT false,
    start_date          DATE NOT NULL,
    end_date             DATE NOT NULL,
    person_personid  INTEGER
);

ALTER TABLE leave ADD CONSTRAINT leave_pk PRIMARY KEY ( leaveid );

CREATE TABLE person (
    personid             serial,
    name                 char(4000) DEFAULT 'Человек_N' NOT NULL,
    email                char(400) NOT NULL,
    workphonenumber      char(20),
    personalphonenumber  char(20) NOT NULL,
    "Comment"            char(5000),
    isemployee           boolean DEFAULT false
);

ALTER TABLE person ADD CONSTRAINT person_pk PRIMARY KEY ( personid );

CREATE TABLE personright (
    person_personid  INTEGER NOT NULL,
    right_rightid    INTEGER NOT NULL
);

CREATE TABLE personemployee (
    person_personid  INTEGER NOT NULL,
    employee_personid    INTEGER NOT NULL
);

CREATE TABLE personskill (
    skill_skillid    INTEGER NOT NULL,
    person_personid  INTEGER NOT NULL
);

CREATE TABLE project (
    projectid  SERIAL,
    name       char(4000) DEFAULT 'Проект_N' NOT NULL,
    start_date    DATE NOT NULL,
    end_date       DATE NOT NULL
);

ALTER TABLE project ADD CONSTRAINT project_pk PRIMARY KEY ( projectid );

CREATE TABLE projectrecord (
    recordid           SERIAL,
    hoursperweek       FLOAT(2) NOT NULL,
    start_date           DATE NOT NULL,
    end_date                DATE,
    person_personid    INTEGER NOT NULL,
    project_projectid  INTEGER NOT NULL
);

ALTER TABLE projectrecord ADD CONSTRAINT projectrecord_pk PRIMARY KEY ( recordid );

CREATE TABLE requiredskill (
    vacancy_vacancyid  INTEGER NOT NULL,
    skill_skillid      INTEGER NOT NULL
);

CREATE TABLE rightt (
    rightid  SERIAL,
    name     char(4000) DEFAULT 'Право_N' NOT NULL
);

ALTER TABLE rightt ADD CONSTRAINT right_pk PRIMARY KEY ( rightid );

CREATE TABLE skill (
    skillid      SERIAL,
    name         char(4000) DEFAULT 'Навык_N' NOT NULL,
    description  char(5000)
);

ALTER TABLE skill ADD CONSTRAINT skill_pk PRIMARY KEY ( skillid );

CREATE TABLE task (
    taskid             SERIAL,
    description        char(5000) NOT NULL,
    hours              FLOAT(2) NOT NULL,
    project_projectid  INTEGER NOT NULL
);

ALTER TABLE task ADD CONSTRAINT task_pk PRIMARY KEY ( taskid );

CREATE TABLE vacancy (
    vacancyid          SERIAL,
    description        char(5000),
    grade_gradeid      INTEGER NOT NULL,
    project_projectid  INTEGER NOT NULL
);

ALTER TABLE vacancy ADD CONSTRAINT vacancy_pk PRIMARY KEY ( vacancyid );

ALTER TABLE employee
    ADD CONSTRAINT employee_grade_fk FOREIGN KEY ( grade_gradeid )
        REFERENCES grade ( gradeid );

ALTER TABLE leave
    ADD CONSTRAINT leave_person_fk FOREIGN KEY ( person_personid )
        REFERENCES person ( personid );

ALTER TABLE personright
    ADD CONSTRAINT personright_person_fk FOREIGN KEY ( person_personid )
        REFERENCES person ( personid );

ALTER TABLE personemployee
    ADD CONSTRAINT personemployee_person_fk FOREIGN KEY ( person_personid )
        REFERENCES person ( personid );

ALTER TABLE personemployee
    ADD CONSTRAINT personemployee_employee_fk FOREIGN KEY ( employee_personid )
        REFERENCES employee ( personid );

ALTER TABLE personright
    ADD CONSTRAINT personright_right_fk FOREIGN KEY ( right_rightid )
        REFERENCES rightt ( rightid );

ALTER TABLE personskill
    ADD CONSTRAINT personskill_person_fk FOREIGN KEY ( person_personid )
        REFERENCES person ( personid );

ALTER TABLE personskill
    ADD CONSTRAINT personskill_skill_fk FOREIGN KEY ( skill_skillid )
        REFERENCES skill ( skillid );

ALTER TABLE projectrecord
    ADD CONSTRAINT projectrecord_person_fk FOREIGN KEY ( person_personid )
        REFERENCES person ( personid );

ALTER TABLE projectrecord
    ADD CONSTRAINT projectrecord_project_fk FOREIGN KEY ( project_projectid )
        REFERENCES project ( projectid );

ALTER TABLE requiredskill
    ADD CONSTRAINT requiredskill_skill_fk FOREIGN KEY ( skill_skillid )
        REFERENCES skill ( skillid );

ALTER TABLE requiredskill
    ADD CONSTRAINT requiredskill_vacancy_fk FOREIGN KEY ( vacancy_vacancyid )
        REFERENCES vacancy ( vacancyid );

ALTER TABLE task
    ADD CONSTRAINT task_project_fk FOREIGN KEY ( project_projectid )
        REFERENCES project ( projectid );

ALTER TABLE vacancy
    ADD CONSTRAINT vacancy_grade_fk FOREIGN KEY ( grade_gradeid )
        REFERENCES grade ( gradeid );

ALTER TABLE vacancy
    ADD CONSTRAINT vacancy_project_fk FOREIGN KEY ( project_projectid )
        REFERENCES project ( projectid );
