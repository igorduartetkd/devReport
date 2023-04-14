const diagnostico = document.getElementById("diagnostico");
const solucao = document.getElementById("solucao");

const mudancaRisco = document.getElementById("risco-3");

const testesUnitarios = document.getElementById("testes");
const objetivoTicket = document.getElementById("objetivo-ticket");

const form = document.getElementById("form");
const btnClear = document.getElementById("clear");
const btnGenerate = document.getElementById("generate");
const result = document.getElementById("result");
const closeBtn = document.createElement("button");


function clearForm(event) {
	const confirmacao = confirm("Essa ação irá limpar o formulário");
	if (confirmacao) {
		form.reset();
	}
}

function obterTextAreaDoInput(input) {
	return document.querySelector('textarea[name="' + input.name + '"]')
}

function exibirAreaTexto(element) {
	const textArea = obterTextAreaDoInput(element)
	textArea.style.height = "100px"; /* Ajusta a altura para exibir o conteúdo */
	textArea.style.padding =' 5px';
	textArea.required = true;

}

function esconderAreaTexto(element) {
	const textArea = obterTextAreaDoInput(element)
	textArea.value = "";
	textArea.style.height = "0"; /* Ajusta a altura para 0 para ocultar o conteúdo */
	textArea.style.padding =' 0px';
	textArea.required = false;
}


function generateReport(event) {
	event.preventDefault();
	result.innerHTML = "";
	const report = createReportCard();
	result.appendChild(report);
	alert("Relatório copiado para área de transferência");
}

function obterDescricaoQuebra(name) {
	const radioQuebra = document.querySelector('input[name="' + name + '"]:checked');
	const textArea = document.querySelector('textarea[name="' + name + '"]');
	return `${radioQuebra.value}. ${textArea.value}`
}

function createReportCard() {
	const riscoRadioUm = document.querySelector('input[name="risco-1"]:checked');
	const riscoRadioDois = document.querySelector('input[name="risco-2"]:checked');

	const quebraBancoDesc = obterDescricaoQuebra('quebra-banco')
	const quebraApiDesc = obterDescricaoQuebra('quebra-api')

	const modal = document.createElement("div");
	modal.classList.add("modal");
	const divContainer = document.createElement("div");
	divContainer.classList.add("container-report");
	const titleContainer = document.createElement("h2");
	titleContainer.innerText = 'Reporter do Desenvolvedor'
	const paragrafo = document.createElement("p");
	paragrafo.style.color =  '#ffcc00';
	paragrafo.style.fontWeight = 'bold';
	closeBtn.innerText = "Fechar";
	closeBtn.classList.add("btnClose");

	divContainer.append( closeBtn, paragrafo);
	modal.appendChild(divContainer);

	const comentarioGerado = `
h1. Diagnóstico 
${diagnostico.value}
h1. 1-Solução
${solucao.value}

h1. 2-Riscos
# Qual é a probabilidade de causar problemas em outras funcionalidades/serviços/sistemas
** ${riscoRadioUm.value}
# No caso da probabilidade se concretizar quão impactante os problemas seriam?
** ${riscoRadioDois.value}
# Quais riscos estão envolvidos na mudança? Descreva-os abaixo
** ${mudancaRisco.value}
# Existe quebra de compatibilidade de banco de dados de algum serviço? Se sim, qual e o que?
** ${quebraBancoDesc}
# Existe quebra de compatibilidade entre serviços (API), se sim, em qual serviço e funcionalidade? Quais outros serviços precisam subir junto ou revertê-los juntos?
** ${quebraApiDesc}

h1. 3-Testes unitários/integrados automatizados
${testesUnitarios.value}

h1. 4-Modificações no objetivo do ticket e tomadas de decisão
${objetivoTicket.value}`
	paragrafo.innerText = comentarioGerado

	try{
		navigator.clipboard.writeText(comentarioGerado);
	} catch (error) {
		console.error('Ocorreu um erro ao copiar para o clipboard:', error);
	}

	return modal;
}

btnClear.addEventListener("click", clearForm);
form.addEventListener("submit", generateReport);
closeBtn.addEventListener("click", function () {
	result.innerHTML = "";
});
