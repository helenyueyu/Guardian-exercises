var fs = require('fs')

// Get the array of acceptible words
let array = fs.readFileSync('twl06.txt').toString().split('\n')

// Create the Scrabble "deck"
// Implemented Fisher-Yates shuffling algorithm
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


// 0 points
const GenerateTile = (letter, points, quantity) => {
  return Array(quantity).fill({
    letter: letter,
    points: points
  })
}

let blank = GenerateTile('Blank', 0, 2)

// 1 point tiles
let E = GenerateTile('E', 1, 12)
let A = GenerateTile('A', 1, 9)
let I = GenerateTile('I', 1, 9)
let O = GenerateTile('O', 1, 8)
let N = GenerateTile('N', 1, 6)
let R = GenerateTile('R', 1, 6)
let T = GenerateTile('T', 1, 6)
let L = GenerateTile('L', 1, 4)
let S = GenerateTile('S', 1, 4)
let U = GenerateTile('U', 1, 4)

// 2 point tiles
let D = GenerateTile('D', 2, 4)
let G = GenerateTile('G', 2, 3)

// 3 point tiles
let B = GenerateTile('B', 3, 2)
let C = GenerateTile('C', 3, 2)
let M = GenerateTile('M', 3, 2)
let P = GenerateTile('P', 3, 2)

// 4 point tiles
let F = GenerateTile('F', 4, 2)
let H = GenerateTile('H', 4, 2)
let V = GenerateTile('V', 4, 2)
let W = GenerateTile('W', 4, 2)
let Y = GenerateTile('Y', 4, 2)

// 5 point tiles
let K = GenerateTile('K', 5, 1)


// 8 point tiles
let J = GenerateTile('J', 8, 1)
let X = GenerateTile('X', 8, 1)

// 10 point tiles
let Q = GenerateTile('Q', 10, 1)
let Z = GenerateTile('Z', 10, 1)

let scrabbleDist = [
  ...E,
  ...A,
  ...I,
  ...O,
  ...N,
  ...R,
  ...T,
  ...L,
  ...S,
  ...U,
  ...D,
  ...G,
  ...B,
  ...C,
  ...M,
  ...P,
  ...F,
  ...H,
  ...V,
  ...W,
  ...Y,
  ...K,
  ...J,
  ...X,
  ...Q,
  ...Z
]

let myTiles = shuffle(scrabbleDist).slice(0,7)
console.log(myTiles)
let myLetters = myTiles.map(x => x.letter)
console.log(myLetters)


const getAllSubsets = theArray => theArray.reduce((subsets, value) => subsets.concat(subsets.map(set => [...set, value])), [[]])

const permut = string => {
    if (string.length < 2) return string;
    var permutations = [];
    for (var i=0; i<string.length; i++) {
        var char = string[i];
        if (string.indexOf(char) != i)
            continue;
        var remainingString = string.slice(0,i) + string.slice(i+1,string.length);
        for (var subPermutation of permut(remainingString))
            permutations.push(char + subPermutation)
    }
    return permutations;
}

let allCombos = []
let allPermuts = []
let possibleWords = []
const getAllPossibleWords = (letters) => {
  allCombos = getAllSubsets(letters).filter(x => x.length !== 0).map(x => x.join('')).map(x => x.toLowerCase())
  for (let i = 0; i < allCombos.length; i++) {
    allPermuts.push(...permut(allCombos[i]))
  }
  possibleWords = allPermuts.sort()
  return possibleWords
}


console.log(getAllPossibleWords(myLetters)[323])
console.log(getAllPossibleWords(myLetters).length)

let acceptableWords = []
for (let i = 0; i < getAllPossibleWords(myLetters).length; i++) {
  if (array.includes(getAllPossibleWords(myLetters)[i])) {
    acceptableWords.push(getAllPossibleWords(myLetters)[i])
  }
}
console.log(acceptableWords.slice(0, 50))
console.log(array.length)
