from src.pre_built.counter import count_ocurrences


def test_counter():
    path = 'data/jobs.csv'
    word = 'Python'
    result = count_ocurrences(path, word)
    total_python_words = 1639
    assert result == total_python_words
