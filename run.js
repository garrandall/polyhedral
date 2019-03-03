const Polyhedral = require('./lib');

console.log(Polyhedral('2d20h + 4 + 3 - d4 + d10').roll());
console.log(Polyhedral('2d20h').plus('4').plus('3').minus('d4').plus('d10').sample());
