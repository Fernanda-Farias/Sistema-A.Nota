// Biblioteca Node para rodar prompt
const prompt = require('prompt-sync')({ sigint: true });

// Classe com dados dos alunos
class Aluno {
  constructor(nome, matricula, curso, turma, notas = []) {
    this.nome = nome;
    this.matricula = matricula;
    this.curso = curso;
    this.turma = turma;
    this.notas = notas;
  }
}

// Array para armazenar os alunos
let alunos = [];

// Função para validar se há alunos cadastrados
function validarAlunos() {
  if (alunos === undefined || alunos.length === 0) {
    console.log('Nenhum aluno cadastrado ainda.\n');
    return false;
  }
  return true; // Retorna true se tiver alunos cadastrados para a função seguinte continuar executando
}

// Função para encontrar um aluno pela matrícula
function encontrarAlunoPorMatricula(matricula) {
  for (let i = 0; i < alunos.length; i++) {
    if (alunos[i].matricula === matricula) {
      return alunos[i];
    }
  }
  return null; // Retorna null se o aluno não for encontrado
}

// Função para adicionar um novo aluno
function cadastrarAluno() {
  const nome = prompt('Digite o nome do aluno: ');
  const matricula = prompt('Digite a matrícula: ');
  const curso = prompt('Digite o curso: ');
  const turma = prompt('Digite a turma: ');
  const primeiraNota = parseFloat(prompt('Digite a 1° nota do aluno: '));

  const novoAluno = new Aluno(nome, matricula, curso, turma, [primeiraNota]);
  alunos[alunos.length] = novoAluno;
  console.log('Aluno adicionado com sucesso!\n');
}

// Função para exibir a lista de alunos cadastrados
function exibirAlunos() {
  if (!validarAlunos()) return;

  console.log('\nLista de Alunos:');
  for (let i = 0; i < alunos.length; i++) {
    const aluno = alunos[i];
    console.log(`${i + 1}. Nome: ${aluno.nome}`);
    console.log(`Matrícula: ${aluno.matricula}`);
    console.log(`Curso: ${aluno.curso}`);
    console.log(`Turma: ${aluno.turma}`);

    // Cocatenando as notas do aluno para exibi-las
    let notasJuntas = '';
    for (let i = 0; i < aluno.notas.length; i++) {
      notasJuntas += aluno.notas[i];
      if (i < aluno.notas.length - 1) {
        notasJuntas += ', ';
      }
    }

    console.log(`Notas: ${notasJuntas}\n`);
  }
}


// Função para procurar um aluno pela matrícula
function procurarAluno() {
  if (!validarAlunos()) return;

  const matricula = prompt('Digite a matrícula do aluno que deseja procurar: ');
  const aluno = encontrarAlunoPorMatricula(matricula);

  if (aluno) {
    // Cocatenando as notas do aluno para exibi-las
    let notasJuntas = '';
    for (let i = 0; i < aluno.notas.length; i++) {
      notasJuntas += aluno.notas[i];
      if (i < aluno.notas.length - 1) {
        notasJuntas += ', ';
      }
    }

    console.log(`\nDados do Aluno:\nNome: ${aluno.nome}\nMatrícula: ${aluno.matricula}\nCurso: ${aluno.curso}\nTurma: ${aluno.turma}\nNotas: [${notasJuntas}]\n`);
  } else {
    console.log('Aluno com a matrícula informada não foi encontrado.\n');
  }
}

// Função para atualizar os dados de um aluno existente
function atualizarDadosAluno() {
  if (!validarAlunos()) return;

  const matricula = prompt('Digite a matrícula do aluno para atualizar os dados: ');
  const aluno = encontrarAlunoPorMatricula(matricula);

  if (!aluno) {
    console.log('Aluno não encontrado.\n');
    return;
  }

  const novoNome = prompt(`Digite o novo nome do aluno (atual: ${aluno.nome}): `);
  const novoCurso = prompt(`Digite o novo curso do aluno (atual: ${aluno.curso}): `);
  const novaTurma = prompt(`Digite a nova turma do aluno (atual: ${aluno.turma}): `);

  // Verifica se o novo nome é uma string válida
  aluno.nome = novoNome || aluno.nome;
  // Verifica se o novo curso é uma string válida
  aluno.curso = novoCurso || aluno.curso;
  // Verifica se a nova turma é uma string válida
  aluno.turma = novaTurma || aluno.turma;

  console.log('Dados do aluno atualizados com sucesso!\n');
}

// Função para remover um aluno pela matrícula
function removerAluno() {
  if (!validarAlunos()) return;

  const matricula = prompt('Digite a matrícula do aluno que deseja remover: ');
  let indiceAluno = -1; 

  // Encontrar o índice do aluno
  for (let i = 0; i < alunos.length; i++) {
    if (alunos[i].matricula === matricula) {
      indiceAluno = i;
      break;
    }
  }

  if (indiceAluno === -1) {
    console.log('Aluno não encontrado.\n');
    return;
  }

  // Remover o aluno recriando o array sem o aluno a ser removido
  const novosAlunos = [];
  for (let i = 0; i < alunos.length; i++) {
    if (i !== indiceAluno) {
      novosAlunos[novosAlunos.length] = alunos[i];
    }
  }

  alunos = novosAlunos;
  console.log('Aluno removido com sucesso!\n');
}

// Função para adicionar uma nota a um aluno existente
function adicionarNotaAluno() {
  if (!validarAlunos()) return;

  const matricula = prompt('Digite a matrícula do aluno para adicionar uma nova nota: ');
  const aluno = encontrarAlunoPorMatricula(matricula);

  if (!aluno) {
    console.log('Aluno não encontrado.\n');
    return;
  }

  if (aluno.notas.length >= 4) {
    console.log('O aluno já possui o máximo de notas permitidas.\n');
  } else {
    const novaNota = parseFloat(prompt('Digite a nova nota: '));
    aluno.notas[aluno.notas.length] = novaNota;
    console.log('\nNota adicionada com sucesso!\n');
  }
}

// Função para editar uma nota de um aluno existente
function editarNotaAluno() {
  if (!validarAlunos()) return;

  const matricula = prompt('Digite a matrícula do aluno para editar uma nota: ');
  const aluno = encontrarAlunoPorMatricula(matricula);

  if (!aluno) {
    console.log('Aluno não encontrado.\n');
    return;
  }

  if (aluno.notas.length === 0) {
    console.log('O aluno não possui notas para editar.\n');
    return;
  }

  // Cocatenando as notas do aluno para exibi-las
  let notasJuntas = '';
  for (let i = 0; i < aluno.notas.length; i++) {
    notasJuntas += aluno.notas[i];
    if (i < aluno.notas.length - 1) {
      notasJuntas += ', ';
    }
  }

  console.log(`Notas atuais: [${notasJuntas}]`);
  const indiceNota = parseInt(prompt('Digite o índice da nota que deseja editar (começando de 1): ')) - 1;

  if (indiceNota < 0 || indiceNota >= aluno.notas.length) {
    console.log('Índice de nota inválido.\n');
    return;
  }

  const novaNota = parseFloat(prompt('Digite a nova nota: '));
  aluno.notas[indiceNota] = novaNota;
  console.log('Nota editada com sucesso!\n');
}

// Função de menu
function menu() {
  console.log('\nMenu de Opções\n');
  console.log('1. Cadastrar Aluno');
  console.log('2. Exibir Alunos');
  console.log('3. Procurar Aluno');
  console.log('4. Atualizar Dados do Aluno');
  console.log('5. Remover Aluno');
  console.log('6. Adicionar Nota ao Aluno');
  console.log('7. Editar Nota do Aluno');
  console.log('8. Sair');
}

let escolha;
console.log('Seja Bem-Vindo(a) ao Sistema A.Nota!');
// do while que complementa o Menu, executando as funções desejadas
do {
  menu();
  escolha = parseInt(prompt('\nEscolha a opção desejada: '));

  switch (escolha) {
    case 1:
      cadastrarAluno();
      break;
    case 2:
      exibirAlunos();
      break;
    case 3:
      procurarAluno();
      break;
    case 4:
      atualizarDadosAluno();
      break;
    case 5:
      removerAluno();
      break;
    case 6:
      adicionarNotaAluno();
      break;
    case 7:
      editarNotaAluno();
      break;
    case 8:
      console.log('Obrigado(a) por usar o Sistema A.Nota!');
      break;
    default:
      console.log('Opção inválida. Tente novamente.\n');
      break;
  }
} while (escolha != 8);