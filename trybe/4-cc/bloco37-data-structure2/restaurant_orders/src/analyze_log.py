import csv
from track_orders import TrackOrders


def analyze_log(path_to_file):
    if not path_to_file.endswith(".csv"):
        raise FileNotFoundError(f"Extensão inválida: '{path_to_file}'")

    track_orders = TrackOrders()
    try:
        with open(path_to_file, "r") as file:
            reader = csv.reader(file)
            for row in reader:
                client, dish, day = row
                track_orders.add_new_order(client, dish, day)

        with open("data/mkt_campaign.txt", "w") as f:

            write_into_file = f"""{track_orders
    .get_most_ordered_dish_per_customer("maria")}
{track_orders.get_quantity_of_dish_ordered_by_customer(
"arnaldo", "hamburguer"
)}
{str(track_orders.get_never_ordered_per_customer("joao"))}
{str(track_orders.get_days_never_visited_per_customer("joao"))}
"""
            f.write(write_into_file)

    except FileNotFoundError:
        raise FileNotFoundError(f"Arquivo inexistente: '{path_to_file}'")
