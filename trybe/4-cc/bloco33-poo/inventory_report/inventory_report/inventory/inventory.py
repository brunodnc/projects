from inventory_report.importer.csv_importer import CsvImporter
from inventory_report.importer.json_importer import JsonImporter
from inventory_report.importer.xml_importer import XmlImporter
from inventory_report.reports.simple_report import SimpleReport
from inventory_report.reports.complete_report import CompleteReport


class Inventory():
    def import_data(path, type):
        parsed_data = []
        if (path.endswith('csv')):
            parsed_data = CsvImporter.import_data(path)
        if (path.endswith('json')):
            parsed_data = JsonImporter.import_data(path)
        if (path.endswith('xml')):
            parsed_data = XmlImporter.import_data(path)
        if (type == 'simples'):
            return SimpleReport.generate(parsed_data)
        return CompleteReport.generate(parsed_data)
