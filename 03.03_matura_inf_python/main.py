def get_words_from_file(file_path: str):
    words = []
    with open(file_path, 'r') as file:
        line = file.readline()
        while line:
            words.append(line.strip())
            line = file.readline()
    return words


def zad_4_1():
    words = get_words_from_file("sygnaly.txt")
    message = ""
    for i in range(39, words.__len__(), 40):
        message += words[i][9]
    print(message)


def zad_4_2():
    def get_number_of_different_letters(word: str):
        found_letters = []
        for letter in word:
            if letter not in found_letters:
                found_letters.append(letter)

        return found_letters.__len__()

    words = get_words_from_file("sygnaly.txt")
    current_word = ""
    current_word_different_letters_count = float('-inf')
    for word in words:
        if get_number_of_different_letters(word) > current_word_different_letters_count:
            current_word = word
            current_word_different_letters_count = get_number_of_different_letters(
                word
            )

    print(f"{current_word} {current_word_different_letters_count}")


def zad_4_3():
    # I am assuming here that the alphabet specified in the task is an ASCII alphabet without special characters
    # I really wrote this comment, its not ai generated!
    def get_distance_between_letters(first_letter, second_letter):
        return abs(ord(first_letter) - ord(second_letter))

    def check_if_word_is_valid(word):
        for letter_index, letter in enumerate(word):
            if word.__len__() - 1 > letter_index:
                if get_distance_between_letters(letter, word[letter_index + 1]) >= 10:
                    return False
        return True

    words = get_words_from_file("sygnaly.txt")

    for word in words:
        if check_if_word_is_valid(word):
            print(word)


if __name__ == "__main__":
    print("Zadanie 4.1:\n")
    zad_4_1()
    print('\n')
    print('='*50)
    print('\n')

    print("Zadanie 4.2:\n")
    zad_4_2()
    print('\n')
    print('='*50)
    print('\n')

    print("Zadanie 4.3:\n")
    zad_4_3()
