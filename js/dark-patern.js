class darkPatern{
    bestPseudo = {}
    pseudoExemples =["beau-gosse-du-31", "soso-domie", "mange-tes-morts", "ma-mère-me-saoul", "roland-culé", "lenny-bar", "éve-valide-ce-jeux"]
    bestScores = [];
    scoreBoard = [];
    tableScore = document.querySelector("tbody");
    setnumberplayer = document.querySelector('.display-number-player');


    constructor() {
        this.getRandomNumber();
        this.shuffleArray(this.pseudoExemples)
        this.arrayFaker();
        this.createTableScore();
        this.displayPlayerNumbers();
        this.updateScore();
    }
    shuffleArray(datas){
        for (let i = datas.length - 1; i > 0; i--) {
            // Génère un index aléatoire entre 0 et i (inclus)
            const j = Math.floor(Math.random() * (i + 1));

            // Échange les éléments aux indices i et j
            [datas[i], datas[j]] = [datas[j], datas[i]];
        }
    }

    getRandomNumber() {
        let darkPatern = this;
        for(let i = 0; i < 7; i++){
            let scoreCreate =  Math.floor(Math.random() * (190 - 170 + 1)) + 170;
            darkPatern.scoreBoard.push(scoreCreate);
            darkPatern.bestScores = darkPatern.scoreBoard.sort((a, b) => b - a);
        }
    }

    arrayFaker(){
        let darkPatern = this;
        darkPatern.bestPseudo.datas = []
        if (localStorage.getItem('bestPseudo') === null){
            for(let i = 0; i < 7; i++){
                let nouvelObjet = {
                    pseudo : darkPatern.pseudoExemples[i],
                    score : darkPatern.bestScores[i]
                };
                darkPatern.bestPseudo.datas.push(nouvelObjet);
            }
            let bestPseudoJSON = JSON.stringify(darkPatern.bestPseudo.datas);
            localStorage.setItem('bestPseudo', bestPseudoJSON);
        }
    }

    createTableScore() {
        let darkPatern = this;
        let data = localStorage.getItem('bestPseudo');
        let parsedData = JSON.parse(data);

        parsedData.slice(0, 5).forEach((element, index) => {
            let datasScore = document.createElement("tr");
            let playerPosition = document.createElement("th");
            let playerPseudo = document.createElement("td");
            let playerScore = document.createElement("td");

            darkPatern.tableScore.appendChild(datasScore);
            datasScore.appendChild(playerPosition);
            datasScore.appendChild(playerPseudo);
            datasScore.appendChild(playerScore);

            playerPosition.setAttribute("scope", "row");
            playerPosition.innerText = index + 1;

            playerPseudo.innerText = element.pseudo;

            playerScore.innerText = element.score;
        });
    }

    displayPlayerNumbers(){
        let darkPatern = this;
        let scoreCreate =  Math.floor(Math.random() * (100 - 80 + 1)) + 80;

        let playerNumbers = document.createElement('h3');
        darkPatern.setnumberplayer.appendChild(playerNumbers);

        playerNumbers.innerText = 'Joueurs en ligne : ' + scoreCreate;
    }

    updateScore(){
        let data = localStorage.getItem('bestPseudo');
        let parsedData = JSON.parse(data);
        let value = Math.floor(Math.random()*parsedData.length);
        let valueUpdate = parsedData[value].score + 2;
        parsedData[value].score = valueUpdate;
        parsedData.sort((a, b) => b.score - a.score);

        localStorage.removeItem('bestPseudo');
        localStorage.setItem('bestPseudo', JSON.stringify(parsedData));
    }
}

let paternNoir = new darkPatern();