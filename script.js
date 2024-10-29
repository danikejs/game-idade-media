let gold = 100;
let wood = 100;
let castleHealth = 100;
let warriors = 0;

const totalDefenses = 10; // Número total de defesas necessárias
let defensesSuccessful = 0; // Contador de defesas bem-sucedidas

let canCollectWood = true; // Controla o tempo de coleta de madeira

let questions = [
    { question: "Em que ano começou a Idade Média?", answer: "476" },
    { question: "Quem foi o líder dos Hunos que invadiu a Europa?", answer: "Átila" },
    { question: "Qual foi o sistema econômico predominante na Idade Média?", answer: "Feudalismo" },
    { question: "Como era chamado o guerreiro medieval que usava armadura e cavalo?", answer: "Cavaleiro" },
    { question: "Qual foi a guerra entre cristãos e muçulmanos pelo controle de Jerusalém?", answer: "Cruzadas" },
    { question: "Quem foi o rei francês conhecido como 'O Rei Sol'?", answer: "Luís XIV" },
    { question: "Qual foi a epidemia que devastou a Europa na Idade Média?", answer: "Peste Negra" },
    { question: "Qual era a principal forma de organização social na Idade Média?", answer: "Feudalismo" },
    { question: "Qual era a instituição mais poderosa durante a Idade Média?", answer: "Igreja Catolica" },
    { question: "Como se chamava o código de conduta dos cavaleiros?", answer: "Cavalaria" }
];

function updateResources() {
    document.getElementById('gold').innerText = gold;
    document.getElementById('wood').innerText = wood;
    document.getElementById('castle-health').innerText = castleHealth;
    document.getElementById('warriors').innerText = warriors;
}

function recruitWarrior() {
    if (gold >= 20) {
        gold -= 20;
        warriors += 1;
        alert("Guerreiro recrutado!");
    } else {
        alert("Ouro insuficiente!");
    }
    updateResources();
}

function repairCastle() {
    if (wood >= 30 && castleHealth < 100) {
        wood -= 30;
        castleHealth += 30;
        if (castleHealth > 100) castleHealth = 100;
        alert("Castelo reparado!");
    } else if (castleHealth >= 100) {
        alert("O castelo já está com saúde máxima!");
    } else {
        alert("Madeira insuficiente!");
    }
    updateResources();
}

function askQuestion() {
    let randomIndex = Math.floor(Math.random() * questions.length);
    let selectedQuestion = questions[randomIndex];

    document.getElementById('question').innerText = selectedQuestion.question;
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('answer').value = ''; // Limpa resposta anterior
}

function checkAnswer() {
    let userAnswer = document.getElementById('answer').value.trim().toLowerCase();
    let currentQuestion = document.getElementById('question').innerText;
    
    let correctAnswer = questions.find(q => q.question === currentQuestion).answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        let earnedGold = Math.floor(Math.random() * 40) + 10; // Aumenta ganho de ouro (entre 10 e 50)
        gold += earnedGold;
        alert(`Resposta correta! Você ganhou ${earnedGold} de ouro.`);
    } else {
        alert("Resposta errada! Você não ganhou ouro.");
    }

    updateResources();
    document.getElementById('question-container').style.display = 'none';
}

function collectWood() {
    if (canCollectWood) {
        let woodAmount = Math.floor(Math.random() * 20) + 5; // Ganha entre 5 e 25 de madeira
        wood += woodAmount;
        alert(`Você coletou ${woodAmount} de madeira!`);

        // Impede a coleta de madeira por 10 segundos
        canCollectWood = false;
        setTimeout(() => {
            canCollectWood = true;
        }, 10000); // 10 segundos de espera
    } else {
        alert("Aguarde 10 segundos para coletar madeira novamente.");
    }
    updateResources();
}

function enemyAttack() {
    // Aumenta o dano base do ataque
    let baseDamage = Math.floor(Math.random() * 12) + 5; // Dano entre 5 e 16

    // Reduz o dano com base no número de guerreiros
    let damageReduction = Math.max(0, warriors); // Cada guerreiro reduz o dano em 1
    let damage = baseDamage - damageReduction;

    // Se não houver guerreiros, o castelo recebe dano extra
    if (warriors === 0) {
        damage += 5; // Dano extra se não houver guerreiros
    }

    // Se o dano resultar em um valor negativo, definir como 1
    if (damage < 1) damage = 1;

    castleHealth -= damage;

    // Perde entre 1 a 3 guerreiros a cada ataque
    let warriorsLost = Math.floor(Math.random() * 3) + 1; // Perde entre 1 e 3 guerreiros
    warriors -= warriorsLost;

    if (warriors < 0) {
        warriors = 0; // Garante que não tenha guerreiros negativos
    }

    if (castleHealth <= 0) {
        castleHealth = 0;
        endGame("O castelo foi destruído! Você perdeu o jogo.");
    } else {
        alert(`O castelo foi atacado e perdeu ${damage} de saúde! Você perdeu ${warriorsLost} guerreiros!`);
        defensesSuccessful += 1; 
        checkDefenseVictory(); 
    }
    updateResources();
}

function checkDefenseVictory() {
    if (defensesSuccessful >= totalDefenses) {
        endGame("Você defendeu o castelo com sucesso dez vezes! Parabéns, você venceu!");
    }
}

function endGame(message) {
    alert(message);
    document.getElementById('victory-message').innerText = message;
    document.getElementById('victory-message').style.display = 'block';
    document.getElementById('actions').style.display = 'none';
}

function randomRound() {
}
