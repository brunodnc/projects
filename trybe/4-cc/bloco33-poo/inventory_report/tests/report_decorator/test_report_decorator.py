from inventory_report.reports.colored_report import ColoredReport
from inventory_report.reports.simple_report import SimpleReport


def test_decorar_relatorio():
    products_list = [
        {
            "id": 1,
            "nome_do_produto": "Cafe",
            "nome_da_empresa": "Cafes Nature",
            "data_de_fabricacao": "2020-07-04",
            "data_de_validade": "2023-02-09",
            "numero_de_serie": "FR48",
            "instrucoes_de_armazenamento": "instrucao",
        }
    ]

    result = ColoredReport(SimpleReport).generate(products_list)
    result_split = result.splitlines()

    assert (
        "\033[32m" in result_split[0] and "\033[0m" in result_split[0]
    ) is True
    assert (
        "\033[36m" in result_split[0] and "\033[0m" in result_split[0]
    ) is True
    assert (
        "\033[32m" in result_split[1] and "\033[0m" in result_split[1]
    ) is True
    assert (
        "\033[36m" in result_split[1] and "\033[0m" in result_split[1]
    ) is True
    assert (
        "\033[31m" in result_split[2] and "\033[0m" in result_split[2]
    ) is True
