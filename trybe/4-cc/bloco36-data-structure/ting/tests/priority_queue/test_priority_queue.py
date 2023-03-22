from ting_file_management.priority_queue import PriorityQueue

file_data_1 = {
    "nome_do_arquivo": "file1.txt",
    "linhas_do_arquivo": ["line1", "line2", "line3", "line4"],
}
file_data_2 = {
    "nome_do_arquivo": "file2.txt",
    "linhas_do_arquivo": ["line1", "line2"],
}
file_data_3 = {
    "nome_do_arquivo": "file3.txt",
    "linhas_do_arquivo": ["line1", "line2", "line3"],
}
file_data_4 = {
    "nome_do_arquivo": "file4.txt",
    "linhas_do_arquivo": ["line1", "line2", "line3", "line4"],
}
file_data_5 = {
    "nome_do_arquivo": "file5.txt",
    "linhas_do_arquivo": ["line1", "line2", "line3", "line4", "line5"],
}

file_data_6 = {
    "nome_do_arquivo": "file6.txt",
    "linhas_do_arquivo": [
        "line1",
        "line2",
        "line3",
        "line4",
        "line5",
        "line6",
    ],
}

file_1 = {
    "nome_do_arquivo": "file1.txt",
    "qtd_linhas": len(file_data_1["linhas_do_arquivo"]),
    "linhas_do_arquivo": file_data_1["linhas_do_arquivo"],
}
file_2 = {
    "nome_do_arquivo": "file2.txt",
    "qtd_linhas": len(file_data_2["linhas_do_arquivo"]),
    "linhas_do_arquivo": file_data_2["linhas_do_arquivo"],
}
file_3 = {
    "nome_do_arquivo": "file3.txt",
    "qtd_linhas": len(file_data_3["linhas_do_arquivo"]),
    "linhas_do_arquivo": file_data_3["linhas_do_arquivo"],
}

file_4 = {
    "nome_do_arquivo": "file4.txt",
    "qtd_linhas": len(file_data_4["linhas_do_arquivo"]),
    "linhas_do_arquivo": file_data_4["linhas_do_arquivo"],
}

file_5 = {
    "nome_do_arquivo": "file5.txt",
    "qtd_linhas": len(file_data_5["linhas_do_arquivo"]),
    "linhas_do_arquivo": file_data_5["linhas_do_arquivo"],
}

file_6 = {
    "nome_do_arquivo": "file6.txt",
    "qtd_linhas": len(file_data_6["linhas_do_arquivo"]),
    "linhas_do_arquivo": file_data_6["linhas_do_arquivo"],
}


def test_basic_priority_queueing():
    pq = PriorityQueue()
    pq.enqueue(file_1)
    pq.enqueue(file_2)
    pq.enqueue(file_3)
    assert pq.dequeue() == "file1.txt"
    assert pq.dequeue() == "file2.txt"
    assert pq.dequeue() == "file3.txt"

    pq2 = PriorityQueue()
    pq2.enqueue(file_6)
    pq2.enqueue(file_1)
    pq2.enqueue(file_2)
    assert pq2.dequeue() == "file6.txt"
    assert pq2.dequeue() == "file1.txt"
    assert pq2.dequeue() == "file2.txt"

    pq3 = PriorityQueue()
    pq3.enqueue(file_2)
    pq3.enqueue(file_1)
    assert pq3.search("file2.txt")
    assert not pq3.search("file4.txt")

    pq4 = PriorityQueue()
    try:
        pq4.dequeue()
    except IndexError:
        assert True
    else:
        assert False
