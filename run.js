const Polyhedral = require('./lib');

const dice = Polyhedral('2 d20h').plus('2d6').minus('1');

console.log(dice.sample(3));

console.log(Polyhedral().roll());
