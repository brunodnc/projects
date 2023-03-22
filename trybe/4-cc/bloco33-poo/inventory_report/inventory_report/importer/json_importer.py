import json
from inventory_report.importer.importer import Importer


class JsonImporter(Importer):
    @staticmethod
    def import_data(path):
        if (path.endswith('.json')):
            with open(path) as file:
                parsed_json = json.load(file)
                return parsed_json
        else:
            raise ValueError('Arquivo inválido')
