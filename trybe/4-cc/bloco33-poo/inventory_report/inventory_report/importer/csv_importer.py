import csv
from inventory_report.importer.importer import Importer


class CsvImporter(Importer):
    @staticmethod
    def import_data(path):
        print("MENSAGEM BEM GRANDONA COM LETRAS GARRAFAIS")
        if (path.endswith('.csv')):
            result = []
            with open(path) as file:
                parsed_csv = csv.DictReader(file, delimiter=",")
                for row in parsed_csv:
                    result.append(row)
            return result
        else:
            raise ValueError('Arquivo inválido')
