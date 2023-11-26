const msgErro = document.getElementById("msgErro");
const btnConsultar = document.getElementById("btn-consultar");
const btnNovaConsulta = document.getElementById("btnNovaConsulta");

btnConsultar.addEventListener("click", consultar);
btnNovaConsulta.addEventListener("click", novaConsulta);

var txtNumeroSequencial = document.getElementById("txtNumeroSequencial");
var txtDigitoVerificador = document.getElementById("txtDigitoVerificador");
var txtAnoAjuizamento = document.getElementById("txtAnoAjuizamento");
var txtOrgaoSegmento = document.getElementById("txtOrgaoSegmento");
var txtUnidadeOrigem = document.getElementById("txtUnidadeOrigem");

var numeroSequencialNumero = "";
var digitoVerificadorNumero = "";
var anoAjuizamentoNumero = "";
var orgaoSegmentoNumero = "";
var unidadeOrigemNumero = "";
var jtrRecuperado = "";
var unidadeOrigemRecuperada = "";

function pegarNumeroProcesso() {
    let numeroProcessoInicial = document.getElementById("txt-numero-processo").value;
    formatarNumeroProcesso(numeroProcessoInicial);
}

function formatarNumeroProcesso(numeroProcessoInicial) {
    numeroFormatado = numeroProcessoInicial.replace(/\D/g, '');
    validarNumero(numeroFormatado);
}

function validarNumero(numeroFormatado) {
    if (numeroFormatado.length === 20) {
        separarValores(numeroFormatado);
    } else {
        msgErro.classList.remove('hidden');
        return;
    }
}

function separarValores(numeroValidado) {
    numeroSequencialNumero = numeroValidado.substring(0, 7);
    digitoVerificadorNumero = numeroValidado.substring(7, 9);
    anoAjuizamentoNumero = numeroValidado.substring(9, 13);
    orgaoSegmentoNumero = numeroValidado.substring(13, 16);
    unidadeOrigemNumero = numeroValidado.substring(16, 20);

    buscarJtr(orgaoSegmentoNumero);
}

async function buscarJtr(orgaoSegmentoNumero) {
    try {
        const response = await fetch('./assets/jtr.json');
        const data = await response.json();

        const codigoEncontrado = data.find(orgao => String(orgao.codigo) === String(orgaoSegmentoNumero));

        if (codigoEncontrado) {

            jtrRecuperado = codigoEncontrado.nome;

        } else {
            jtrRecuperado = "Não foi possível localizar o orgão responsável";
        }

    } catch (error) {
        console.error('Erro ao carregar o arquivo JSON:', error);
        return null;
    }

    buscarUnidadeOrigem(unidadeOrigemNumero, orgaoSegmentoNumero);
}

async function buscarUnidadeOrigem(unidadeOrigemNumero, orgaoSegmentoNumero) {
    try {
        const response = await fetch(`./assets/${orgaoSegmentoNumero}.json`);
        const data = await response.json();

        const unidadeOrigemEncontrada = data.find(unidade => String(unidade.codigo) === String(unidadeOrigemNumero));

        if (unidadeOrigemEncontrada) {

            unidadeOrigemRecuperada = unidadeOrigemEncontrada.nome;

        } else {
            unidadeOrigemRecuperada = "Não foi possível localizar a unidade responsável";
        }

    } catch (error) {
        console.error('Erro ao carregar o arquivo JSON:', error);
        return null;
    }
    mostrarResultado(numeroSequencialNumero, digitoVerificadorNumero, anoAjuizamentoNumero, orgaoSegmentoNumero, unidadeOrigemNumero, jtrRecuperado, unidadeOrigemRecuperada);
}

function mostrarResultado(numeroSequencialNumero, digitoVerificadorNumero, anoAjuizamentoNumero, orgaoSegmentoNumero, unidadeOrigemNumero, jtrRecuperado, unidadeOrigemRecuperada) {

    const pegarSpan = document.querySelectorAll(".span-resultado");

    pegarSpan.forEach(span => {
        span.classList.remove("hidden");
        span.classList.add("mostrar-resultado");
    })

    btnConsultar.classList.add("hidden");
    msgErro.classList.add("hidden");

    txtNumeroSequencial.innerText = `Numero sequencial: ${numeroSequencialNumero} - Esse número é zerado todo ano.`;
    txtDigitoVerificador.innerText = `Dígito verificador: ${digitoVerificadorNumero}`;
    txtAnoAjuizamento.innerText = `Ano do ajuizamento do processo: ${anoAjuizamentoNumero}`;
    txtOrgaoSegmento.innerText = `Órgão ou segmento do Poder Judiciário: ${orgaoSegmentoNumero} - ${jtrRecuperado}`;
    txtUnidadeOrigem.innerText = `Unidade de origem do processo: ${unidadeOrigemNumero} - ${unidadeOrigemRecuperada}`;
}

async function consultar() {
    pegarNumeroProcesso();
}

function novaConsulta() {
    const pegarSpan = document.querySelectorAll(".span-resultado");
    const limparCampo = document.getElementById("txt-numero-processo");

    pegarSpan.forEach(span => {
        span.classList.remove("mostrar-resultado");
        span.classList.add("hidden");
    })

    limparCampo.value = "";

    btnConsultar.classList.remove("hidden");
    btnNovaConsulta.classList.add("hidden");

    msgErro.classList.add("hidden");
}
