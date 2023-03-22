# from inventory_report.inventory.product import Product


from inventory_report.inventory.product import Product


def test_cria_produto():
    product = Product(
        1,
        "produto",
        "empresa",
        "data_fabricacao",
        "data_validade",
        "1",
        "instrucoes",
    )
    assert product.id == 1
    assert product.nome_do_produto == "produto"
    assert product.nome_da_empresa == "empresa"
    assert product.data_de_fabricacao == "data_fabricacao"
    assert product.data_de_validade == "data_validade"
    assert product.numero_de_serie == "1"
    assert product.instrucoes_de_armazenamento == "instrucoes"
