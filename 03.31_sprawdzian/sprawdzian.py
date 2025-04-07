from models.Teacher import Teacher
from models.Subject import Subject
from models.Student import Student
from models.Grade import Grade
from datetime import date

# h. Zaimportuj dane uczniów z pliku students.txt do zmiennej students. Dane
# w pliku mają następującą strukturę:
# i. Każda linia w pliku zawiera dane przedmiotu w formacie
# <identyfikator> <imię> <nazwisko> <data urodzenia>.
# ii. Datę urodzenia możesz zmapować na obiekt datetime.date
# poprzez użycie fragmentu kodu:
# birthdate = datetime.datetime.strptime(birthdate_from_file,
# '%Y-%m-%d').date()
# i. Zaimportuj dane ocen z pliku grades.txt do zmiennej grades. Dane w pliku
# mają następującą strukturę:
# i. Każda linia w pliku zawiera dane przedmiotu w formacie
# <identyfikator ucznia> <identyfikator przedmiotu> <oceny
# oddzielone przecinkiem>
# j. Podczas importu ocen pamiętaj o odpowiednim mapowaniu
# identyfikatora ucznia na obiekt ucznia z listy students oraz identyfikatora
# przedmiotu na obiekt przedmiotu z listy subjects. W przypadku braku
# dopasowania ucznia lub przedmiotu pomiń wiersz.


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
            try:
                subjects.append(
                    Subject(int(line[0]), line[1], teachers[int(line[2])]))
            except IndexError:
                pass
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

            try:
                grade = Grade(
                    students[int(line[0])],
                    subjects[int(line[1])]
                )
                grade_data = line[2].split(',')
                for grade_value in grade_data:
                    grade.add_grade(int(grade_value))

                grades.append(grade)
            except IndexError:
                pass

            line = file.readline().strip()
