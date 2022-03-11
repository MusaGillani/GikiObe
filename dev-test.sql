use obe_dev_test;

CREATE TABLE plos(
	plo_num INT NOT NULL PRIMARY KEY,
    plo_desc VARCHAR(255) NOT NULL
);

CREATE TABLE course_instructors(
	instructor_id VARCHAR(255) PRIMARY KEY,
    full_name VARCHAR(20) NOT NULL,
    faculty VARCHAR(20)
);

CREATE TABLE course_allotments(
	CourseCode VARCHAR(30) NOT NULL COLLATE utf8mb4_unicode_ci,
    instructor_id VARCHAR(255) NOT NULL,
    PRIMARY KEY(CourseCode,instructor_id),
    FOREIGN KEY(instructor_id) REFERENCES course_instructors(instructor_id),
    FOREIGN KEY(CourseCode) REFERENCES schemeofstudy(CourseCode)
);

CREATE TABLE course_clos(
    CourseCode VARCHAR(30) NOT NULL COLLATE utf8mb4_unicode_ci,
    clo_num INT NOT NULL,
    clo_desc VARCHAR(255) NOT NULL,
    mappede_on_plo INT NOT NULL,
    PRIMARY KEY(CourseCode,clo_num),
    FOREIGN KEY(CourseCode) REFERENCES schemeofstudy(CourseCode),
    FOREIGN KEY(mapped_on_plo) REFERENCES plos(plo_num)
);


