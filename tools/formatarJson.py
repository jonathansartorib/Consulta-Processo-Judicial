import json

dados = [
    {
        "codigo": 100,
        "nome": "Supremo Tribunal Federal"
    },
    {
        "codigo": 200,
        "nome": "Conselho Nacional de Justiça"
    }
]

# Formatando os dados conforme solicitado
dados_formatados = {
    str(item["codigo"]): {
        "name": item["nome"],
        "site": "",
        "tel": ""
    }
    for item in dados
}

# Convertendo para JSON com aspas duplas
dados_json = json.dumps([dados_formatados], ensure_ascii=False, indent=2, separators=(',', ': '))

# Substituindo as aspas simples por aspas duplas
dados_json = dados_json.replace("'", "\"")

# Escrevendo no arquivo
with open('dados_formatados.json', 'w', encoding='utf-8') as file:
    file.write(dados_json)

print("Arquivo 'dados_formatados.json' criado com sucesso!")