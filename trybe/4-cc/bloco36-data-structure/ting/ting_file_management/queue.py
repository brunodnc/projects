from ting_file_management.abstract_queue import AbstractQueue


class Queue(AbstractQueue):
    def __init__(self):
        self.queue = []

    def __len__(self):
        return len(self.queue)

    def enqueue(self, item):
        self.queue.append(item)

    def dequeue(self):
        if not self.is_empty():
            return self.queue.pop(0)

    def search(self, index):
        if index < 0 or index >= len(self.queue):
            raise IndexError("Index out of range")
        return self.queue[index]

    def is_empty(self):
        return len(self.queue) == 0
