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

# Criar um dicionário para armazenar os dados formatados
dados_formatados = {}

# Adicionar os dados ao dicionário usando o código como chave
for code, nome in matches:
    dados_formatados[code] = {
        'name': nome.strip(),
        'site': '',
        'tel': ''
    }

# Criar um JSON com o dicionário
json_data = json.dumps([dados_formatados], indent=4)

# Escrever o JSON em um arquivo
with open('unidades_formatadas.json', 'w') as json_file:
    json_file.write(json_data)

