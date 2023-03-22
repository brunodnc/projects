def is_anagram(first_string, second_string):
    str1 = first_string.lower()
    str2 = second_string.lower()
    list1 = list(str1)
    list2 = list(str2)
    sorted_list1 = bubble_sort(list1)
    sorted_list2 = bubble_sort(list2)
    str1_sorted = "".join(sorted_list1)
    str2_sorted = "".join(sorted_list2)
    if len(first_string) < 1 or len(second_string) < 1:
        return (str1_sorted or "", str2_sorted or "", False)
    return (str1_sorted, str2_sorted, str1_sorted == str2_sorted)


# source: https://www.geeksforgeeks.org/python-program-for-bubble-sort/
def bubble_sort(list):
    n = len(list)
    if n == 1:
        return list
    for i in range(n - 1):
        for j in range(0, n - i - 1):
            if list[j] > list[j + 1]:
                list[j], list[j + 1] = list[j + 1], list[j]
    return list
