from models.Teacher import Teacher

__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Wojciech Choroś 4D"


class Subject:
    id: int
    name: str
    teacher: Teacher

    def __init__(self, id: int, name: str, teacher: Teacher) -> None:
        self.id = id
        self.name = name
        self.teacher = teacher

    def __str__(self):
        return f"{self.name} {self.teacher}"
