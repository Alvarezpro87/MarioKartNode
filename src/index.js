const players = [
    {
      NOME: "Mario",
      VELOCIDADE: 4,
      MANOBRABILIDADE: 3,
      PODER: 3,
      PONTOS: 0,
    },
    {
      NOME: "Luigi",
      VELOCIDADE: 3,
      MANOBRABILIDADE: 4,
      PODER: 4,
      PONTOS: 0,
    },
    {
      NOME: "Peach",
      VELOCIDADE: 3,
      MANOBRABILIDADE: 4,
      PODER: 2,
      PONTOS: 0,
    },
    {
      NOME: "Yoshi",
      VELOCIDADE: 2,
      MANOBRABILIDADE: 4,
      PODER: 3,
      PONTOS: 0,
    },
    {
      NOME: "Donkey Kong",
      VELOCIDADE: 2,
      MANOBRABILIDADE: 2,
      PODER: 5,
      PONTOS: 0,
    },
    {
      NOME: "Bowser",
      VELOCIDADE: 5,
      MANOBRABILIDADE: 2,
      PODER: 5,
      PONTOS: 0,
    },
  ];
  
  async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }
  
  async function getRandomBlock() {
    let random = Math.random();
    let result;
  
    switch (true) {
      case random < 0.33:
        result = "RETA";
        break;
      case random < 0.66:
        result = "CURVA";
        break;
      default:
        result = "CONFRONTO";
    }
  
    return result;
  }
  
  async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(
      `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
        diceResult + attribute
      }`
    );
  }
  
  async function playRaceEngine(players) {
    for (let round = 1; round <= 5; round++) {
      console.log(`🏁 Rodada ${round}`);
  
      // sortear bloco
      let block = await getRandomBlock();
      console.log(`Bloco: ${block}`);
  
      // rolar os dados e calcular os resultados para todos os jogadores
      for (let player of players) {
        let diceResult = await rollDice();
        let totalTestSkill = 0;
  
        if (block === "RETA") {
          totalTestSkill = diceResult + player.VELOCIDADE;
          await logRollResult(
            player.NOME,
            "velocidade",
            diceResult,
            player.VELOCIDADE
          );
        }
  
        if (block === "CURVA") {
          totalTestSkill = diceResult + player.MANOBRABILIDADE;
          await logRollResult(
            player.NOME,
            "manobrabilidade",
            diceResult,
            player.MANOBRABILIDADE
          );
        }
  
        if (block === "CONFRONTO") {
          totalTestSkill = diceResult + player.PODER;
          await logRollResult(
            player.NOME,
            "poder",
            diceResult,
            player.PODER
          );
        }
  
        player.totalTestSkill = totalTestSkill;
      }
  
      // Determinar o vencedor da rodada
      let winner = players.reduce((prev, current) =>
        prev.totalTestSkill > current.totalTestSkill ? prev : current
      );
  
      if (block === "CONFRONTO") {
        let losers = players.filter(player => player !== winner && player.PONTOS > 0);
        for (let loser of losers) {
          console.log(
            `${winner.NOME} venceu o confronto! ${loser.NOME} perdeu 1 ponto 🐢`
          );
          loser.PONTOS--;
        }
      } else {
        console.log(`${winner.NOME} marcou um ponto!`);
        winner.PONTOS++;
      }
  
      console.log("-----------------------------");
    }
  }
  
  async function declareWinner(players) {
    console.log("Resultado final:");
    players.forEach(player => {
      console.log(`${player.NOME}: ${player.PONTOS} ponto(s)`);
    });
  
    let winner = players.reduce((prev, current) =>
      prev.PONTOS > current.PONTOS ? prev : current
    );
  
    let topPlayers = players.filter(player => player.PONTOS === winner.PONTOS);
  
    if (topPlayers.length > 1) {
      console.log("A corrida terminou em empate");
    } else {
      console.log(`\n${winner.NOME} venceu a corrida! Parabéns! 🏆`);
    }
  }
  
  (async function main() {
    console.log(
      `🏁🚨 Corrida começando...\n`
    );
  
    await playRaceEngine(players);
    await declareWinner(players);
  })();
  