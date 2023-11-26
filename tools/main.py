import PyPDF2
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('826.pdf', 'rb') as pdfFileObj:
    pdfReader = PyPDF2.PdfReader(pdfFileObj)


    indices_paginas = [0,1,2,3,4,5,6]


    for indice_pagina in indices_paginas:
        # Obtem a página
        pageObj = pdfReader.pages[indice_pagina - 1]

        # Extrai o texto da página
        texto = pageObj.extract_text()

        # Imprime o texto da página
        print(texto)
