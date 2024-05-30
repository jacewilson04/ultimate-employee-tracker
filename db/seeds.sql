SET FOREIGN_KEY_CHECKS=0;

INSERT INTO department (name)
VALUES ("Security"),
    ("Science"),
    ("Logistics"),
    ("Ethics");

INSERT INTO role (title, salary, department_id)
VALUES ("Agent", 50, 1),
    ("Special Agent", 100, 1),
    ("Overseer", 200, 1),

    ("Research Assitant", 60, 2),
    ("Researcher", 120, 2),
    ("Director", 240, 2),

    ("Operator", 25, 3),
    ("Supervisor", 50, 3),
    ("Director", 100, 3),

    ("Student", 0, 4),
    ("Ethical Constituent", 5, 4),
    ("Director", 10, 4);

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

