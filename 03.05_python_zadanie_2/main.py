
# Twoim zadaniem jest zaimportowanie danych z dwóch plików tekstowych i
# odwzorowanie ich na klasy w języku Python. Dane zawarte w plikach są ze sobą
# powiązane – jeden plik zawiera informacje o studentach, a drugi o kursach, na które są
# zapisani.

# Wymagania

# 1) Zaimportuj dane z dwóch plików tekstowych:
# a) students.txt zawiera informacje o studentach: id, imię, nazwisko, wiek
# b) courses.txt zawiera informacje o kursach: id studenta, nazwa kursu
# 2) Stwórz klasy Student i Course, w których zastosujesz poprawne typowanie
# zmiennych.
# 3) Zmapuj dane - każdy obiekt klasy Student powinien zawierać listę kursów, na które
# jest zapisany.
# 4) Wypisz dane w czytelnej formie: dla każdego studenta jego imię, nazwisko, wiek oraz
# listę kursów.
# 5) Dla każdego ze studentów utwórz plik tekstowy imię_nazwisko.txt, który będzie
# zawierał listę kursów w formacie:
# Kursy:
# - a,
# - b,
# - c

# Przykładowy wynik działania programu
# Poniżej zaprezentowano wynik dla danych w plikach students_example.txt oraz
# courses_example.txt

# Wynik wypisany na ekranie

# Jan Kowalski (21 lat): Matematyka, Fizyka
# Anna Nowak (22 lat): Informatyka, Matematyka
# Piotr Zieliński (20 lat): Historia

# Wygenerowany plik jan_kowalski.txt

# Kursy:
# - Matematyka,
# - Fizyka

class Course:
    student_id: int
    name: str

    def __init__(self, student_id, name):
        self.student_id = student_id
        self.name = name


class Student:
    _id: int
    first_name: str
    last_name: str
    age: int
    courses: list[Course]

    def __init__(self, id: int, first_name: str, last_name: str, age: int, courses: list[Course]):
        self._id = id
        self.first_name = first_name
        self.last_name = last_name
        self.age = age
        self.courses = courses


def find_courses_by_student_id(id: int, course_list: list[Course]):
    found_courses: list[Course] = []
    for course in course_list:
        if course.student_id == id:
            found_courses.append(course)
    return found_courses


if __name__ == "__main__":
    course_list: list[Course] = []
    student_list: list[Student] = []

    with open("courses.txt") as file:
        line = file.readline().strip()
        while line:
            line = line.split(',')
            course_list.append(
                Course(
                    int(line[0]),
                    line[1]
                )
            )
            line = file.readline().strip()

    with open("students.txt") as file:
        line = file.readline().strip()
        while line:
            line = line.split(',')
            student_list.append(
                Student(
                    int(line[0]),
                    line[1],
                    line[2],
                    int(line[3]),
                    find_courses_by_student_id(int(line[0]), course_list)
                )
            )
            line = file.readline().strip()

    for student in student_list:
        print(f"{student.first_name} {student.last_name} ({student.age})")
        with open(f"exported/{student.first_name}_{student.last_name}.txt", 'w') as file:
            content = "Kursy:"
            for course in student.courses:
                content += f"\n - {course.name}"

                print(f" - {course.name}")
            file.write(content)