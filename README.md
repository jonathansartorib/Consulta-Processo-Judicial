# Consulta Processo Judicial

Este é um projeto para consulta de origem de processos judiciais de todo o Brasil.

<p align="center">
  <img src="https://github.com/jonathansartorib/Consulta-Processo-Judicial/blob/main/screenshot.png" width="500px" alt="tela consulta">
</p>

## Tecnologias utilizadas
- Html
- CSS
- JavaScript
- Python
- Bibliotecas Python: PyPDF2, chardet

## Contribuindo
Contribuições são bem-vindas!

TODO - Adicionar arquivos com unidades de origem de processo em arquivos json com o formato abaixo. O nome dos arquivos json devem ter o numero JTR correspondente ao das unidades inclusas como por exemplo 826.json para Estado de São Paulo. Esses arquivos devem ser incluídos na pasta assets.

    [
        {
            "codigo": "0000",
            "nome": "Tribunal de Justiça de São Paulo"
        },
       .........
    ]

## Ferramentas
Foi disponibilizado na pasta [tools](https://github.com/jonathansartorib/Consulta-Processo-Judicial/tree/main/tools) dois arquivos python, aonde se pode pegar arquivos em pdf com unidades de origem e transforma-los em arquivos json como acima para facilitar a criação dos arquivos já que são muitos dados a serem capturados.

No arquivo [main.py](https://github.com/jonathansartorib/Consulta-Processo-Judicial/blob/main/tools/main.py) deve ser indicado o arquivo em pdf contendo as unidades de origem as paginas que devem ser convertidas e executar o seguinte comando para que os dados sejam gerados no arquivo saida_terminal.txt:

    python main.py > saida_terminal.txt

Em seguida execute o arquivo [criarJson.py](https://github.com/jonathansartorib/Consulta-Processo-Judicial/blob/main/tools/criarJson.py) para que os dados sejam inclusos no arquivo unidades.json e assim trabalhados.


## Licença
Este projeto é licenciado sob a Licença MIT - veja o arquivo [LICENSE.md](https://github.com/jonathansartorib/Consulta-Processo-Judicial/blob/main/LICENSE) para detalhes.







