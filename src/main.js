// "Welcome to “the dead zone.” It’s a special place that, unbeknown to himself, every degenerate gambler seeks. 
// Check out the bar at the track after the seventh race. The people there are as happy as satiated hogs. 
// They have lost the grocery money, the rent, the mortgage and car payment, even the vig they owe a Shylock. 
// But they’re safe now because they have nothing else to lose. 
// They also have the empirical evidence to prove once and for all time that the universe has conspired 
// to cheat and injure them. Their personal failure is God’s, not theirs. 
// The soul is packed in dry ice now, the battle over." -- James Lee Burke "The Tin-Roof Blowdown"

let cash = 100;
let pokemonIdx = [13,27,58,99,212,81,304,111,499,601];
let pokemonURL = [];
let numbersArray = [];
let numCounts = {};

const getPokemonURL = (idx) => {
    let pokemonID = idx.toString();
    fetch('https://pokeapi.co/api/v2/pokemon/'+pokemonID)
        .then((res) => { return res.json()})
        .then(data => {
            pokemonURL.push(data.sprites.front_default);
            console.log(data.sprites.front_default);
        })
}

window.onload = () => {
    document.getElementById("cash").innerHTML = `Cash: $${cash}`;
    for (let i=0;i<pokemonIdx.length;i++){
        getPokemonURL(pokemonIdx[i]);

    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

function getCounts() {
    for (var i = 0; i < numbersArray.length; i++) {
        let num = numbersArray[i];
        numCounts[num] = numCounts[num] ? numCounts[num] + 1 : 1;
      }
}

function checkWin(){
    let prize=0;
    for (var numbers in numCounts) {
        if (numCounts.hasOwnProperty(numbers)) {
          if (numCounts[numbers] > 1) {
              switch (numCounts[numbers]) {
                case 2: 
                    prize += 1;
                    break;
                case 3:
                    prize += 20;
                    break;
                case 4:
                    prize += 500;
                    break;
                case 5:
                    prize += 1000;    
                    break;

              }
              
          }
        }
      }
      return prize;
}

function playSlots() {
    
    if (cash > 4){
    cash-=5;
    numbersArray=[];
    numCounts = {};
    for (let i = 0;i<5;i++){
        let slotDiv = (i+1).toString();
        let index = getRandomInt(9);
        document.getElementById(slotDiv).innerHTML = `<img src="${pokemonURL[index]}" class="slotImg">`;
        numbersArray.push(index);
    }
    getCounts();
    let prizeMoney = checkWin();
    cash += prizeMoney;
    document.getElementById("resultsText").innerHTML = `You win $${prizeMoney}`;
    document.getElementById("cash").innerHTML = `Cash: $${cash}`;
} else {
    document.getElementById("cash").innerHTML = `Cash: $${cash}`;
    document.getElementById("resultsText").innerHTML = `Spins cost $5, deadbeat. Get some money or get outta here!`;
}
}