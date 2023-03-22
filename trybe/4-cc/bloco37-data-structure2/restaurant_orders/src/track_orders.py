from collections import defaultdict
from collections import Counter


class TrackOrders:
    def __init__(self):
        self.orders = []
        self.customers = defaultdict(set)
        self.dishes = defaultdict(int)
        self.days = defaultdict(set)

    # aqui deve expor a quantidade de estoque
    def __len__(self):
        return len(self.orders)

    def add_new_order(self, customer, order, day):
        self.orders.append((customer, order, day))
        self.customers[customer].add(order)
        self.dishes[order] += 1
        self.days[customer].add(day)

    def get_most_ordered_dish_per_customer(self, customer):
        order_counter = Counter(
            [order[1] for order in self.orders if order[0] == customer])
        if not order_counter:
            return None
        return order_counter.most_common(1)[0][0]

    def get_never_ordered_per_customer(self, customer):
        all_dishes = set(self.dishes.keys())
        ordered_dishes = self.customers[customer]
        return all_dishes - ordered_dishes

    def get_days_never_visited_per_customer(self, customer):
        week = {'segunda-feira', 'terça-feira', 'sabado'}
        visited_days = self.days[customer]
        return week.difference(visited_days)

    def get_busiest_day(self):
        days = [day for visited_days in self.days.values()
                for day in visited_days]
        busiest_day = Counter(days).most_common(1)
        return busiest_day[0][0] if busiest_day else None

    def get_least_busy_day(self):
        days = [day for visited_days in self.days.values()
                for day in visited_days]
        busiest_day = Counter(days).most_common()[
            -1
        ]
        return busiest_day[0] if busiest_day else None

    def get_quantity_of_dish_ordered_by_customer(self, customer, dish):
        count = 0
        for order in self.orders:
            if order[0] == customer and order[1] == dish:
                count += 1
        return count
