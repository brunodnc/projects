from inventory_report.inventory.product import Product


def test_relatorio_produto():
    product = Product("1", "1", "1", "1", "1", "1", "1")
    assert product.__repr__() == (
        "O produto 1 fabricado em 1 por 1"
        + " com validade até 1 precisa ser armazenado 1."
    )
