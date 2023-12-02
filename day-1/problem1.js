const fs = require('node:fs/promises');
let data = []

async function readInput(){
  const data = [];
  const file = await fs.open('input.txt');
  for await (let line of file.readLines()){
    data.push( line);
  }
  //console.log(data.length)
  return data;
}
async function firstDigit(str){
  for(s of str){
    if(!isNaN(parseInt(s)))
    return s;
  }  
}
async function lastDigit(str){
  a = str.split('');
  const rev_str = a.reverse();
  for(s of rev_str){
    if(!isNaN(parseInt(s)))
    return s;
  }  
}

async function init(){
  data = await readInput();
  final = [];
  for(d of data){
    final.push(parseInt(await firstDigit(d) + await lastDigit(d)));
  }
  const sum = final.reduce((partialSum, a) => partialSum + a, 0);
  console.log(sum);

}
init();