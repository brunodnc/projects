from datetime import datetime
from collections import Counter


class SimpleReport:
    def getOldestFabricationDate(list):
        fabrication_dates = []

        for item in list:
            fabrication_dates.append(item['data_de_fabricacao'])

        return min(fabrication_dates)

    def getClosestExpirationDate(list):
        closest_expiration_date = []
        today = datetime.now().strftime('%Y-%m-%d')
        for item in list:
            if item["data_de_validade"] > today:
                closest_expiration_date.append(item["data_de_validade"])

        return min(closest_expiration_date)

    def getCompanyWithMoreProducts(list):
        companies = []

        for item in list:
            companies.append(item["nome_da_empresa"])

        most_common_company_name, _quantity = Counter(
            companies
            ).most_common()[0]
        return most_common_company_name

    @staticmethod
    def generate(list):
        oldest_fabrication_date = SimpleReport.getOldestFabricationDate(
            list
        )
        closest_expiration_date = SimpleReport.getClosestExpirationDate(
            list
        )
        company_with_more_products = SimpleReport.getCompanyWithMoreProducts(
            list
        )

        return (
            f'Data de fabricação mais antiga: {oldest_fabrication_date}\n'
            f'Data de validade mais próxima: {closest_expiration_date}\n'
            f'Empresa com mais produtos: {company_with_more_products}'
        )
