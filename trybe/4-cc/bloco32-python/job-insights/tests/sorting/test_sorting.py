from src.pre_built.sorting import sort_by


def test_sort_by_criteria():
    criteria = "min_salary"
    jobs = [
        {"min_salary": "1000", "max_salary": "5000"},
        {"min_salary": "2000", "max_salary": "3000"},
        ]
    sorted = sort_by(jobs, criteria)
    assert sorted[0] == {"min_salary": "1000", "max_salary": "5000"}

    criteria = "max_salary"
    assert sorted[0] == {"min_salary": "2000", "max_salary": "3000"}
