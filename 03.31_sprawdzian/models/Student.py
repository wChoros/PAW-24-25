from datetime import date

__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Wojciech Choroś 4D"


class Student:
    _id: int
    first_name: str
    last_name: str
    birth_date: date

    def __init__(self, id: int, first_name: str, last_name: str, birth_date: date) -> None:
        self._id = id
        self.first_name = first_name
        self.last_name = last_name
        self.birth_date = birth_date

    @property
    def age(self) -> int:
        curr_date = date.today()
        age = curr_date.year - self.birth_date.year - ((curr_date.month, curr_date.day) < (self.birth_date.month, self.birth_date.day))
        return age 

    def __str__(self):
        return f"{self.first_name} {self.last_name} {self.age}"
    
