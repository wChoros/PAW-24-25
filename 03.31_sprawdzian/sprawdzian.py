import json

from models.Teacher import Teacher
from models.Subject import Subject
from models.Student import Student
from models.Grade import Grade
from datetime import date
from year_grade import year_grade

__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Wojciech Choroś 4D"


def get_student_by_id(id: int, students_list: list[Student]) -> Student | None:
    for student in students_list:
        if student._id == id:
            return student
    return None


def get_subject_by_id(id: int, subjects_list: list[Subject]) -> Subject | None:
    for subject in subjects_list:
        if subject.id == id:
            return subject
    return None


def get_teacher_by_id(id: int, teachers_list: list[Teacher]) -> Teacher | None:
    for teacher in teachers_list:
        if teacher._id == id:
            return teacher
    return None


def find_grades_for_subject(subject: Subject, grades_list: list[Grade]) -> list[Grade]:
    found_grades: list[Grade] = []
    for grade in grades_list:
        if (grade.subject == subject):
            found_grades.append(grade)

    return found_grades


def get_date_from_string(datestring: str) -> date:
    datestring = datestring.split('-')
    year = int(datestring[0])
    month = int(datestring[1])
    day = int(datestring[2])

    return date(year, month, day)


if __name__ == "__main__":
    teachers: list[Teacher] = []
    subjects: list[Subject] = []
    students: list[Student] = []
    grades: list[Grade] = []

    with open("teachers.txt", 'r') as file:
        line = file.readline().strip()
        while line:
            line = line.split(" ")
            teachers.append(Teacher(int(line[0]), line[1], line[2]))
            line = file.readline().strip()

    with open("subjects.txt", 'r') as file:
        line = file.readline().strip()
        while line:
            line = line.split(" ")
            teacher = get_teacher_by_id(int(line[2]), teachers)
            if teacher:
                subjects.append(
                    Subject(
                        int(line[0]),
                        line[1],
                        teacher
                    )
                )
            line = file.readline().strip()

    with open("students.txt", 'r') as file:
        line = file.readline().strip()
        while line:
            line = line.split(" ")
            students.append(
                Student(
                    int(line[0]),
                    line[1],
                    line[2],
                    get_date_from_string(line[3])
                )
            )
            line = file.readline().strip()

    with open("grades.txt", 'r') as file:
        line = file.readline().strip()
        while line:
            line = line.split(" ")

            student = get_student_by_id(int(line[0]), students)
            subject = get_subject_by_id(int(line[1]), subjects)
            if subject and student:
                grade_data = line[2].split(',')
                grade = Grade(
                    student,
                    subject
                )
                for grade_value in grade_data:
                    grade.add_grade(int(grade_value))

                grades.append(grade)

            line = file.readline().strip()

    # printing and exporting
    print("Oceny i średnie poszczególnych uczniów")
    student_dict = {}
    for student in students:
        student_header = f"{student.first_name} {student.last_name} ({student.age}):"
        print(student_header)
        student_dict[student_header] = {}
        student_grades = [
            grade for grade in grades if grade.student == student
        ]
        for grade in student_grades:
            print(f"\t{grade.subject.name}:")
            grade_value_str = ""
            for grade_value in grade.get_grades():
                grade_value_str += (f"{grade_value}, ")
            print("\t\tOceny: " + grade_value_str)
            average = grade.get_average().__round__(2)
            print(f"\t\tŚrednia: {average}")
            final_grade = year_grade(average)
            print(f"\t\tOcena końcowa: {final_grade}")

            # dictionary export:
            student_dict[student_header][grade.subject.name] = {
                "Oceny": grade_value_str,
                "Srednia": average,
                "Ocena Roczna": final_grade
            }
        print("\n")
    with open('students.json', 'w') as file:
        file.write(json.dumps(student_dict, indent=4))

    print('=' * 50)
    print("\n")
    grades_dict = {}
    for subject in subjects:
        print(f"{subject.name}:")
        grades_dict[subject.name] = {}
        print(
            f"\tNauczyciel: {subject.teacher.name} {subject.teacher.surname}"
        )
        grades_dict[subject.name]["Nauczyciel"] = f"{subject.teacher.name} {subject.teacher.surname}"
        grades_list = []
        subject_grades = find_grades_for_subject(subject, grades)
        for grade in subject_grades:
            grades_list.extend(grade.get_grades())

        grades_dict[subject.name]["Oceny"] = grades_list

        grades_str = ", ".join(map(str, grades_list))
        print(f"\tOceny: {grades_str}\n")

    with open('grades.json', 'w') as file:
        file.write(json.dumps(grades_dict, indent=4))
