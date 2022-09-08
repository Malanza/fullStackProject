DROP TABLE IF EXISTS fitnesstracker;

CREATE TABLE fitnesstracker(
    id serial,
    date text,
    workout text,
    duration integer
);

INSERT INTO fitnesstracker(date, workout, duration) VALUES('2022-09-01', 'Chest', 45);
INSERT INTO fitnesstracker(date, workout, duration) VALUES('2022-09-02', 'Swim', 55);
INSERT INTO fitnesstracker(date, workout, duration) VALUES('2022-09-03', 'Legs', 30);
INSERT INTO fitnesstracker(date, workout, duration) VALUES('2022-09-05', 'Shoulders', 45);
