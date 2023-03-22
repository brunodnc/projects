def study_schedule(permanence_period, target_time):
    if target_time is None:
        return None
    if any(
        not isinstance(entry, int) or not isinstance(exit, int)
        for entry, exit in permanence_period
    ):
        return None

    count = 0
    for entry, exit in permanence_period:
        if entry <= target_time <= exit:
            count += 1
    return count
