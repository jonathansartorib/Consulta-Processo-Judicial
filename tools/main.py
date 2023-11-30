import PyPDF2
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

with open('826.pdf', 'rb') as pdfFileObj:
    pdfReader = PyPDF2.PdfReader(pdfFileObj)

    indices_paginas = [0, 1, 2, 3, 4, 5, 6]

    # Dicionário para armazenar os dados formatados
    dados_formatados = {}

    for indice_pagina in indices_paginas:
        # Obtem a página
        pageObj = pdfReader.pages[indice_pagina - 1]

        # Extrai o texto da página
        texto = pageObj.extract_text()

        # Adiciona o texto ao dicionário usando o índice da página como chave
        dados_formatados[str(indice_pagina)] = {
            "text": texto,
            "site": "",
            "tel": ""
        }

    # Convertendo para JSON com aspas duplas
    dados_json = json.dumps([dados_formatados], ensure_ascii=False, indent=2, separators=(',', ': '))

    # Substituindo as aspas simples por aspas duplas
    dados_json = dados_json.replace("'", "\"")

    # Escrevendo no arquivo
    with open('dados_formatados_pdf.json', 'w', encoding='utf-8') as file:
        file.write(dados_json)

    print("Arquivo 'dados_formatados_pdf.json' criado com sucesso!")
