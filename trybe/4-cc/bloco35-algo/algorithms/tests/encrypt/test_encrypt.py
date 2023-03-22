from challenges.challenge_encrypt_message import encrypt_message
import pytest


def test_encrypt_message():
    assert encrypt_message("message", 4) == "ega_ssem"
    assert encrypt_message("message", 3) == "sem_egas"
    assert encrypt_message("message", 7) == "egassem"
    assert encrypt_message("a", 1) == "a"
    assert encrypt_message("", 1) == ""

    with pytest.raises(TypeError, match="tipo inválido para key"):
        encrypt_message("abcd", "abcd")

    with pytest.raises(TypeError, match="tipo inválido para message"):
        encrypt_message(1231421, 1423432)
