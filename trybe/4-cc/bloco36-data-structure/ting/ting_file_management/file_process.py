import sys
from ting_file_management.file_management import txt_importer


def process(path_file, instance):
    file = txt_importer(path_file)
    metadata = {
        "nome_do_arquivo": path_file,
        "qtd_linhas": len(file),
        "linhas_do_arquivo": file,
    }

    for i in range(len(instance)):
        if path_file in instance.search(i)["nome_do_arquivo"]:
            print(f"Arquivo {path_file} já processado anteriormente")
            return None

    instance.enqueue(metadata)
    print(metadata)


def remove(instance):
    try:
        if instance.is_empty():
            raise IndexError
        removed_file_name = instance.dequeue()["nome_do_arquivo"]
        print(
            f"Arquivo {removed_file_name} removido com sucesso",
            file=sys.stdout,
        )
    except IndexError:
        print("Não há elementos", file=sys.stdout)


def file_metadata(instance, position):
    try:
        metadata = instance.search(position)
        print(metadata)
    except IndexError:
        print("Posição inválida", file=sys.stderr)
        return
