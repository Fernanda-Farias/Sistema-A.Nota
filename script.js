// Biblioteca Node para rodar prompt
const prompt = require('prompt-sync')({ sigint: true });

// Classe com dados dos alunos
class Aluno {
  constructor(nome, matricula, curso, turma, notas = []) {
    this.nome = nome;
    this.matricula = matricula;
    this.curso = curso;
    this.turma = turma;
    this.nota = notas;
  }
}

// Array e variável auxiliar para armazenar os alunos
let alunos = [];
let escola = null;

// Função para adicionar um novo aluno
function cadastrarAluno() {
  const nome = prompt('Digite o nome do aluno: ');
  const matricula = prompt('Digite a matrícula: ');
  const curso = prompt('Digite o curso: ');
  const turma = parseInt(prompt('Digite a turma: '));
  const notas = parseFloat(prompt('Digite a 1° nota do aluno: '));

  escola = new Aluno(nome, matricula, curso, turma, [notas]);
  alunos[length + 1] = escola
  console.log('Aluno adicionado com sucesso!\n');
}

// Função para exibir a lista de alunos
function exibirAlunos() {
  console.log('\nLista de Alunos:');
  alunos.forEach((aluno, index) => {
    console.log(`${index + 1}. Nome: ${aluno.nome} \nMatrícula: ${aluno.matricula}, \nCurso: ${aluno.curso}, \nTurma: ${aluno.turma}, \nNotas: [${aluno.notas.join(', ')}]`);
  });
}

// Função para adicionar uma nota a um aluno existente
function adicionarNotaAluno() {
    if (alunos.length === 0) {
      console.log('Nenhum aluno cadastrado ainda.\n');
      return;
    }
  
    exibirAlunos(); // Exibe a lista de alunos para escolha
    const escolha = parseInt(prompt('Escolha o número do aluno para adicionar uma nova nota: ')) - 1;
  
    if (escolha >= 0 && escolha < alunos.length) {
      const novaNota = parseFloat(prompt('Digite a nova nota: '));
      alunos[escolha].adicionarNota(novaNota);
      console.log('Nota adicionada com sucesso!\n');
    } else {
      console.log('Opção inválida. Tente novamente.\n');
    }
  }

// Função principal para exibir o menu
function menu() {
  console.log('\n--- Bem-vindo(a) ao Sistema A.Nota, o Sistema de Notas dos Alunos! ---');
  console.log('\n1- Cadastrar Aluno');
  console.log('\n2- Exibir Alunos');
  console.log('\n3- Adicionar Nota');
  console.log('\n4- Editar Nota');
  console.log('\n5- Remover aluno');
  console.log('\n6- Filtrar Por Nota');
  console.log('\n7- Sair');
}

// Condição de escolha do usuário
do {
  menu();
  const escolha = parseInt(prompt('Escolha a opção desejada: '));

  switch (escolha) {
    case 1:
      cadastrarAluno();
      break;
    case 2:
      exibirAlunos();
      break;
    case 3:
      adicionarNotaAluno();
      break;
    case 7:
        console.log("Obrigada por usar o A.Nota!")
      break;
    default:
      console.log('Opção inválida, tente novamente.');
  }
} while (escolha != 7)
