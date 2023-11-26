import re
import json
import sys
import chardet

# Ler o conteúdo do arquivo
with open('saida_terminal.txt', 'rb') as rawdata:
    result = chardet.detect(rawdata.read(10000))

with open('saida_terminal.txt', 'r', encoding=result['encoding']) as file:
    content = file.read()

# Encontrar as linhas que contêm informações relevantes usando expressões regulares
matches = re.findall(r'\b(\d{4})\s+([^\d]+)\b', content)

# Criar uma lista de dicionários
unidades = [{'codigo': code, 'nome': nome.strip()} for code, nome in matches]

# Criar um JSON com a lista de dicionários
json_data = json.dumps(unidades, indent=4)

# Escrever o JSON em um arquivo
with open('unidades.json', 'w') as json_file:
    json_file.write(json_data)
