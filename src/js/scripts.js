document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const clearButton = document.getElementById("clear-btn");
    const nameInput = document.getElementById("name");
    const xpInput = document.getElementById("xp");
    const agentInputs = document.querySelectorAll("input[name='agent']");
    const midSection = document.getElementById("mid-section");
    const outputSection = document.getElementById("output-section");
    const bannerAgent = document.getElementById("agent");
    const bannerRank = document.getElementById("rank");
    const outputMessage = outputSection.querySelector("h1");
    const motivationalMessage = document.getElementById("motivational");

    //determina o level com base no XP
    function defineLevel(xp) {
        if (xp < 1000) return "Ferro";
        else if (xp < 2000) return "Bronze";
        else if (xp < 4000) return "Prata";
        else if (xp < 7000) return "Ouro";
        else if (xp < 8000) return "Platina";
        else if (xp < 9000) return "Ascendente";
        else if (xp < 10000) return "Imortal";
        else return "Radiante";
    }

    // Parabeniza conforme o level
    function defineMessage(level) {
        if (["Ferro", "Bronze", "Prata", "Ouro", "Platina", "Diamante"].includes(level)) {
            return "Continue para o próximo nível!<br>Com esforço, você pode alcançar os ranks mais altos!";
        } else if (["Ascendente", "Imortal"].includes(level)) {
            return "Parabéns por alcançar um nível avançado!<br>Um pouco mais de dedicação e você chegará ao topo!";
        } else if (level === "Radiante") {
            return "Parabéns, você atingiu um nível épico!";
        }
    }

    // Configurações iniciais
    outputSection.style.display = "none";

    // Ação de submissão do formulário
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Captura o nome, XP e agente favorito
        const name = nameInput.value.trim();
        const xp = parseInt(xpInput.value);
        const mainAgent = Array.from(agentInputs).find(input => input.checked)?.value;

        // Determina o nível do herói
        const level = defineLevel(xp);

        // Exibe a mensagem de nível no output-section
        outputMessage.innerHTML = `O Herói de nome <strong>${name}</strong> está no nível <br><span><strong>${level}</strong></span>`;

        // Define as imagens para o banner com base no agente e no nível
        bannerAgent.src = `./src/images/${mainAgent}.webp`;  // Ajuste o caminho conforme necessário
        bannerAgent.alt = mainAgent;
        bannerRank.src = `./src/images/ranks/${level}.png`;  // Ajuste o caminho conforme necessário
        bannerRank.alt = level;

        // Exibe a mensagem motivacional
        let mensagem = defineMessage(level);
        motivationalMessage.innerHTML = mensagem;
    
        // Alterna a visibilidade entre #mid-section e #output-section
        
        midSection.style.opacity = "0";
        midSection.style.display = "none";
        outputSection.style.opacity = "1";
        outputSection.style.display = "flex";
    });


    // Ação do botão limpar
    clearButton.addEventListener("click", () => {
        // Limpa os campos do formulário
        form.reset();

        // Alterna a visibilidade entre #mid-section e #output-section
        midSection.style.display = "flex";
        outputSection.style.display = "none";
        midSection.style.opacity = "1"; // Mostra a mid-section

        // Limpa a mensagem de saída
        outputMessage.innerHTML = "";
        motivationalElement.innerHTML = "";

        // Limpa as imagens do banner
        bannerAgent.src = "";
        bannerAgent.alt = "";
        bannerRank.src = "";
        bannerRank.alt = "";
    });
});
