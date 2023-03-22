from src.pre_built.brazilian_jobs import read_brazilian_file


def test_brazilian_jobs():
    path = 'tests/mocks/brazilians_jobs.csv'
    data = read_brazilian_file(path)
    expectedData = {"title": "Maquinista", "salary": '2000', "type": "trainee"}
    assert data[0] == expectedData
