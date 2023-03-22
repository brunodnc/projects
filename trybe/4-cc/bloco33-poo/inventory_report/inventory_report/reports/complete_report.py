from collections import Counter
from inventory_report.reports.simple_report import SimpleReport


class CompleteReport(SimpleReport):
    def generate(list):
        simple_report_result = SimpleReport.generate(list)
        companies = [product['nome_da_empresa'] for product in list]
        company_count = Counter(companies).items()

        title = "Produtos estocados por empresa:\n"
        str_data = ""

        for key, value in company_count:
            str_data += f'- {key}: {value}\n'

        return (
            f"{simple_report_result}\n"
            f"{title}"
            f"{str_data}"
        )
