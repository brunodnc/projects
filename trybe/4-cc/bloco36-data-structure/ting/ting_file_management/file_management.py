import sys


def txt_importer(path_file):
    try:
        with open(path_file, "r") as f:
            if not path_file.endswith(".txt"):
                print("Formato inválido\n", file=sys.stderr)
                return []
            lines = f.read().split("\n")
            return lines
    except FileNotFoundError:
        print(f"Arquivo {path_file} não encontrado", file=sys.stderr)
