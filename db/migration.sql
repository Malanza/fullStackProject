DROP TABLE IF EXISTS fitnesstracker;

CREATE TABLE fitnesstracker(
    id serial,
    date text,
    workout text,
    duration integer
);

INSERT INTO fitnesstracker(date, workout, duration) VALUES('Monday', 'Cardio', 45);
INSERT INTO fitnesstracker(date, workout, duration) VALUES('Tuesday', 'Cycling', 55);
INSERT INTO fitnesstracker(date, workout, duration) VALUES('Wednsday', 'Swiming', 30);
INSERT INTO fitnesstracker(date, workout, duration) VALUES('Thursday', 'Weightlifting', 40);
INSERT INTO fitnesstracker(date, workout, duration) VALUES('Friday', 'Cardio', 45);
