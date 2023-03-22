from typing import Union, List, Dict
from src.insights.jobs import read


def get_max_salary(path: str) -> int:
    """Get the maximum salary of all jobs

    Must call `read`

    Parameters
    ----------
    path : str
        Must be passed to `read`

    Returns
    -------
    int
        The maximum salary paid out of all job opportunities
    """
    data = read(path)
    max_salary = 0
    for job in data:
        if job.get('max_salary', '').isdigit():
            ms = int(job['max_salary'])
        else:
            ms = max_salary
        if ms > max_salary:
            max_salary = ms
    return max_salary


def get_min_salary(path: str) -> int:
    """Get the minimum salary of all jobs

    Must call `read`

    Parameters
    ----------
    path : str
        Must be passed to `read`

    Returns
    -------
    int
        The minimum salary paid out of all job opportunities
    """
    data = read(path)
    min_salary = 99999999999
    for job in data:
        if job.get('min_salary', '').isdigit():
            ms = int(job['min_salary'])
        else:
            ms = min_salary
        if ms < min_salary:
            min_salary = ms
    return min_salary


def convertToNumber(mins, maxs, s):
    try:
        return [int(mins), int(maxs), int(s)]
    except ValueError:
        raise ValueError
    except TypeError:
        raise ValueError
    except KeyError:
        raise ValueError


def matches_salary_range(job: Dict, salary: Union[int, str]) -> bool:
    """Checks if a given salary is in the salary range of a given job

    Parameters
    ----------
    job : dict
        The job with `min_salary` and `max_salary` keys
    salary : int
        The salary to check if matches with salary range of the job

    Returns
    -------
    bool
        True if the salary is in the salary range of the job, False otherwise

    Raises
    ------
    ValueError
        If `job["min_salary"]` or `job["max_salary"]` doesn't exists
        If `job["min_salary"]` or `job["max_salary"]` aren't valid integers
        If `job["min_salary"]` is greather than `job["max_salary"]`
        If `salary` isn't a valid integer
    """
    if 'min_salary' not in job or 'max_salary' not in job:
        raise ValueError
    [mins, maxs, s] = convertToNumber(
        job["min_salary"], job["max_salary"], salary
        )
    if mins > maxs:
        raise ValueError
    if mins <= s <= maxs:
        return True
    return False


def filter_by_salary_range(
    jobs: List[dict],
    salary: Union[str, int]
) -> List[Dict]:
    """Filters a list of jobs by salary range

    Parameters
    ----------
    jobs : list
        The jobs to be filtered
    salary : int
        The salary to be used as filter

    Returns
    -------
    list
        Jobs whose salary range contains `salary`
    """
    filtered_jobs = []
    for job in jobs:
        try:
            if matches_salary_range(job, salary):
                filtered_jobs.append(job)
        except ValueError:
            continue
    return filtered_jobs
