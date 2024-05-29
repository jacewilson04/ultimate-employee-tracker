SET FOREIGN_KEY_CHECKS=0;

INSERT INTO department (name)
VALUES ("Security"),
    ("Science"),
    ("Logistics"),
    ("Ethics");

INSERT INTO role (title, salary, department_id)
VALUES ("Agent", 30, 1),
    ("Special Agent", 30, 1),
    ("Overseer", 30, 1),

    ("Research Assitant", 30, 2),
    ("Researcher", 30, 2),
    ("Director", 30, 2),

    ("Operator", 30, 3),
    ("Supervisor", 30, 3),
    ("Director", 30, 3),

    ("Student", 30, 4),
    ("Ethical Constituent", 30, 4),
    ("Director", 30, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Wyatt", "Premium", 1, 3),
    ("Pabloson", "Anima", 2, 3),
    ("Mon", "Log", 3, 3),

    ("William", "Corbulo", 4, 6),
    ("Red", "Nasho", 5, 6),
    ("Cory", "Works", 6, 3),

    ("Mr.", "Nook", 7, 9),
    ("Nen", "Dalla", 8, 9),
    ("Roy", "Three", 9, 3),

    ("Caleb", "Krieg", 10, 12),
    ("Dragon", "Raiken", 11, 12),
    ("Robin", "Nox", 12, 3);

