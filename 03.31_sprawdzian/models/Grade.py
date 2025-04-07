from models.Student import Student
from models.Subject import Subject


class Grade:
    grades: list[int] = []
    student: Student
    subject: Subject

    def __init__(self, student: Student, subject: Subject) -> None:
        self.student = student
        self.subject = subject

    def add_grade(self, value: int) -> None:
        if type(value) is not int:
            raise ValueError("invalid grade value: must be an int!")

        if value not in range(1, 7):
            raise ValueError("Grade value must be between 1 and 6!")

        self.grades.append(value)

    def get_grades(self) -> list[int] | None:
        return self.grades

    def get_average(self) -> float:
        return sum(self.grades) / len(self.grades) if self.grades else None
