__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Wojciech Choroś 4D"


class Teacher:
    _id: int
    name: str
    surname: str

    def __init__(self, id: int, name: str, surname: str) -> None:
        self._id = id
        self.name = name
        self.surname = surname

    def __str__(self):
        return f"{self.name} {self.surname}"
