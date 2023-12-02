const fs = require('node:fs/promises');
let data = []
let count = 0;

async function readInput(){
  const data = [];
  const file = await fs.open('input.txt');
  for await (let line of file.readLines()){
    games = line.split(':')[1].split(';');

    //console.log(games);
    data.push({
      gameId: parseInt(line.split(':')[0].split(' ')[1]),
      rounds: await parseGames(games),
    });

  }
  //console.log(data.length)
  return data;
}

async function parseGames(games){
  parsedGame = []
  for(game of games){
    const rounds = game.split(',');
    const parsedRound = {};
    for(round of rounds){   
      const part = round.trim().split(' ');

      if(part[1] === 'red'){
        parsedRound.r = parseInt(part[0]);
      }else if(part[1]=== 'blue'){
        parsedRound.b = parseInt(part[0]);
      }else{
        parsedRound.g =  parseInt(part[0]);
      }
    }
    parsedGame.push(parsedRound);
  }
  return parsedGame;
}

async function checkGames(game){
  let flag = false;
  for(r of game.rounds){
    if(r.r > 12){
      flag = true;
      break;
    }else if(r.g > 13){
      flag = true;
      break;
    }else if(r.b > 14){
      flag = true;
      break
    }
  }
  if(flag){
    return 0;
  }else{
    return game.gameId;
  }
}
async function init(){
  data = await readInput();
  for(g of data){
    count += await checkGames(g);
  }
  console.log(count);
}
init();