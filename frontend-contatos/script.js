const API_URL = 'http://localhost:3000/jogos';
 
const formCadastro = document.getElementById('form-cadastro');
const listaContatos = document.getElementById('lista-jogos');
const inputId = document.getElementById('contato-id');
const btnCancelar = document.getElementById('btn-cancelar');
 
async function carregarContatos(query = '') {
  const resposta = await fetch(`${API_URL}${query}`);
  const contatos = await resposta.json();
  renderizarContatos(contatos);
}
function renderizarContatos(contatos) {
    listaContatos.innerhtml = '';

    contatos.forEach((contatos) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
      <td>${contatos.nome}</td>
      <td>${contatos.telefone}</td>
      <td>${contatos.email ?? '-' }</td>
      <td>${contatos.cidade}</td>
      <td>
        <button class="btn-editar" data-id="${contatos.id}">Editar</button>
        <button class="btn-excluir" data-id="${contatos.id}">Excluir</button>
      </td>
      `
      listaJogos.appendChild(linha);
    });

}
carregarContatos()

const filtroNome = document.getElementById('filtro-nome');
const filtroCidade = document.getElementById('filtro-cidade');
const btnFiltrar = document.getElementById('btn-filtrar');
const btnLimparFiltro = document.getElementById('btn-limpar-filtro');
 
btnFiltrar.addEventListener('click', () => {
  const parametros = new URLSearchParams();
 
  if (filtroNome.value) parametros.append('nome', filtroNome.value);
  if (filtroCidade.value) parametros.append('cidade', filtroCidade.value);
 
  const query = parametros.toString();
  carregarContatos(query ? `?${query}` : '');
});
 
btnLimparFiltro.addEventListener('click', () => {
  filtroNome.value = '';
  filtroCidade.value = '';
  carregarContatos();
});

formContato.addEventListener('submit', async (evento) => {
  evento.preventDefault();
 
  const contato = {
    nome: document.getElementById('cadastro-nome').value,
    telefone: document.getElementById('cadastro-telefone').value,
    email: document.getElementById('cadastro-email').value ? document.getElementById('cadastro-email').value : null,
    cidade: document.getElementById('cadastro-cidade').value,
  };
 
  const id = inputId.value;
 
  if (id) {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contato)
    });
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contato)
    });
  }
 
  formContato.reset();
  inputId.value = '';
  tituloForm.textContent = 'Cadastrar contato';
  carregarJogos();
});
 
btnCancelar.addEventListener('click', () => {
  formContato.reset();
  inputId.value = '';
  tituloForm.textContent = 'Cadastrar contato';
});