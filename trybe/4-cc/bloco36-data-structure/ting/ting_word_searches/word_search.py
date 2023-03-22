def exists_word(word, instance):
    results = []
    for index in range(len(instance)):
        file = instance.search(index)
        data = {
            "palavra": word,
            "arquivo": file["nome_do_arquivo"],
            "ocorrencias": [],
        }

        ocorreu = False
        for i in range(file["qtd_linhas"]):
            if word.lower() in file["linhas_do_arquivo"][i].lower():
                ocorreu = True
                data["ocorrencias"].append({"linha": i + 1})

        if ocorreu:
            results.append(data)
    return results


def search_by_word(word, instance):
    results = []
    for index in range(len(instance)):
        file = instance.search(index)
        data = {
            "palavra": word,
            "arquivo": file["nome_do_arquivo"],
            "ocorrencias": [],
        }

        ocorreu = False
        for i in range(file["qtd_linhas"]):
            if word.lower() in file["linhas_do_arquivo"][i].lower():
                ocorreu = True
                data["ocorrencias"].append(
                    {
                        "linha": i + 1,
                        "conteudo": file["linhas_do_arquivo"][i],
                    }
                )

        if ocorreu:
            results.append(data)

    return results
