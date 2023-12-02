const fs = require('node:fs/promises');
let data = []
const spelledOut = [
  
  {str: 'one',num: '1'}, 
  {str:'two',num:2}, 
  {str:'three', num: 3},
  {str: 'four', num: 4},
  {str: 'five', num: 5},
  {str: 'six', num: 6},
  {str: 'seven', num: 7},
  {str: 'eight', num: 8},
  {str: 'nine',num: 9},
];
let parsedData = [];

async function readInput(){
  const data = [];
  const file = await fs.open('input.txt');
  for await (let line of file.readLines()){
    data.push( line);
  }
  //console.log(data.length)
  return data;
}

async function findStrings(str){
  const local = []
  let newStr = str;
  let count = 0;
  //brute force
  while(count < 4){
    for(o of spelledOut){
      if(newStr.search(o.str) == -1){
        local.push(null);
      }else{
        local.push({pos: newStr.search(o.str), num: o.num});
      }
    }
    newStr = str.split('');
    for(let i = 0; i < local.length; i++){
      if(local[i] === null){
        //do nothing
      }else{
        newStr[local[i].pos] = local[i].num;
      }
    }
    newStr = newStr.join('')
    console.log  (newStr);
    count ++;
  }
  parsedData.push(newStr);
  

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
  for(d of data){
    await findStrings(d);
  }

  final = [];
  for(d of parsedData){
    final.push(parseInt(await firstDigit(d) + await lastDigit(d)));
  }
  const sum = final.reduce((partialSum, a) => partialSum + a, 0);
  console.log(sum);

}
init();