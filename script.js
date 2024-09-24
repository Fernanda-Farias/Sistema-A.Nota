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

// Função para adicionar um novo aluno
function cadastrarAluno() {
  const nome = prompt('Digite o nome do aluno: ');
  const matricula = prompt('Digite a matrícula: ');
  const curso = prompt('Digite o curso: ');
  const turma = parseInt(prompt('Digite a turma: '));
  const primeiraNota = parseFloat(prompt('Digite a 1° nota do aluno: '));

   // Criação do aluno e adição ao array de alunos
   const novoAluno = new Aluno(nome, matricula, curso, turma, [primeiraNota]);
   alunos.push(novoAluno);
   console.log('Aluno adicionado com sucesso!\n');
}

// Função para exibir a lista de alunos
function exibirAlunos() {
    if (alunos.length === 0) {  // Verifica se há alunos no array
      console.log('Nenhum aluno cadastrado ainda.\n');
      return;
    } 
  
    console.log('\nLista de Alunos:');
    alunos.forEach((aluno, index) => {
      // Acessa e exibe os dados de cada aluno
      console.log(`${index + 1}. Nome: ${aluno.nome}`);
      console.log(`Matrícula: ${aluno.matricula}`);
      console.log(`Curso: ${aluno.curso}`);
      console.log(`Turma: ${aluno.turma}`);
      console.log(`Notas: [${aluno.notas.join(', ')}]\n`);
    });
}
  

// Função para adicionar uma nota a um aluno existente
function adicionarNotaAluno() {
    if (alunos.length === 0) {
      console.log('Nenhum aluno cadastrado ainda.\n');
      return;
    }
  
    const matricula = prompt('Digite a matrícula do aluno para adicionar uma nova nota: ');
  
    // Encontrando o aluno pela matrícula
    const aluno = alunos.find(aluno => aluno.matricula === matricula);
  
    // Verificando se o aluno foi encontrado
    if (!aluno) {
      console.log('Aluno não encontrado.\n');
      return;
    }
  
    // Verificando a quantidade de notas do aluno
    if (aluno.notas.length >= 4) {
      console.log('O aluno já possui 4 notas cadastradas e não pode adicionar mais.\n');
    } else {
      const novaNota = parseFloat(prompt('Digite a nova nota: '));
      aluno.notas.push(novaNota); // Adiciona a nova nota ao array de notas
      console.log('\nNota adicionada com sucesso!\n');
    }
}

function procurarAluno() {
    if (alunos.length === 0) {
      console.log('Nenhum aluno cadastrado ainda.\n');
      return;
    }
    const matricula = prompt('Digite a matrícula do aluno que deseja procurar: ');
    //for que procura uma matrícula entre as cadastradas igual a matricula digitada pelo usuário
    let alunoEncontrado = null;
    for (let i = 0; i < alunos.length; i++) {
      if (alunos[i].matricula === matricula) {
        alunoEncontrado = alunos[i];
        break; // Interrompe o loop quando o aluno é encontrado
      }
    }
  
    // Verifica se o aluno foi encontrado
    if (alunoEncontrado) {
      console.log(`\nDados do Aluno:\nNome: ${alunoEncontrado.nome}\nMatrícula: ${alunoEncontrado.matricula}\nCurso: ${alunoEncontrado.curso}\nTurma: ${alunoEncontrado.turma}\nNotas: [${alunoEncontrado.notas.join(', ')}]\n`);
    } else {
      console.log('Aluno com a matrícula informada não foi encontrado.\n');
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
  console.log('\n6- Procurar aluno');
  console.log('\n7- Sair');
}

let escolha;
// Condição de escolha do usuário
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
      adicionarNotaAluno();
      break;
    case 6:
      procurarAluno()
      break;
    case 7:
        console.log("Obrigada por usar o A.Nota!")
      break;
    default:
      console.log('Opção inválida, tente novamente.');
  }
} while (escolha != 7)
