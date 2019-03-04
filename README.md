# Polyhedral 🎲

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A package to roll user-given dice sets and apply modifiers. Built with 5th edition Dungeons and Dragons in mind, this package can accept a string that represents a dice roll and carry out the roll. It can also perform some simple analysis on the distribution of the dice set.

## Installation

Polyhedral can be installed with NPM.

```
npm install polyhedral
```

Simply import to use.

```js
const Polyhedral = require('polyhedral');
```

## Documentation

The package has functionality for rolling and analyzing rolls, and recognizing rolls in strings. The API functions as a chain that builds on previously added rolls. The entrypoint is a function, `Polyhedral` that exposes other functions to build complex dice rolls.

### `Polyhedral`

The initializer function, the can be called without arguments, or with a roll expression.

```js
> Polyhedral().roll();
0
> Polyhedral().plus('d6').roll();
3
> Polyhedral('d6').roll();
5
```

### `Polyhedral.plus`

Parse the given roll expression and add it to the accumulated rolls and modifiers. When evaluated, this expression will be added to the result.

```js
> const plusFive = Polyhedral('+5');
> plusFive.roll();
5
> const plusFivePlusD6 = plusFive.plus('d6');
> plusFivePlusD6.roll();
8
```

### `Polyhedral.minus`

Parse the given roll expression and add it to the accumulated rolls and modifiers. When evaluated, this expression will be subtracted from the result.

```js
> const plusFive = Polyhedral('+10');
> plusFive.roll();
10
> const plusFiveMinusD6 = plusFive.minus('d6');
> plusFiveMinusD6.roll();
6
```

### `Polyhedral.roll`

Evaluates the accumulated rolls and modifiers, returning the integer sum of the results.

```js
> const dice = Polyhedral('2 d20h').plus('2d6').minus('1');
> dice.roll();
29
> dice.roll();
25
> dice.roll();
17
```

### `Polyhedral.sample`

Evaluates the accumulated rolls and modifiers a number of times equal to the argument given, 50 by default.

```js
> const dice = Polyhedral('2 d20h').plus('2d6').minus('1');
> dice.sample(3);
[ 17, 22, 20 ]
```

### `Polyhedral.stringify`

Converts the accumulated roll steps into a roll expression.

```js
> Polyhedral('2 d20h').plus('2d6').minus('1').stringify();
'+2d20h+2d6-1'
```

<!-- ### `Polyhedral.analyze` (not implemented)

### `Polyhedral.english` (not implemented)

### `Polyhedral.match` (not implemented) -->

## Using Polyhedral

This package's strength lies in its ability to interpret die roll expressions commonly found in tabletop games. An expression is composed of 1 or more "steps" joined by a "+" or "-". A step can either be a die step or mod(ifier) step.

### Mod Steps

These are simply natural numbers. `7`, `0`, `-3`, and `+22` are examples of mod steps.

### Die Steps

These are more complex. A die step requires "dX" to be present, where X is the number of faces on the die. This can be preceded by a coefficient, indicating the number of dice to be rolled. This can be followed by "hY" or "lY" indicating that Polyhedral should keep the Y highest ("h") or lowest ("l") results. Omitting a Y value defaults it to 1.

* `2d20h` ("roll 2d20 and keep the highest") corresponds to 5th-edition Dungeons and Dragons's [advantage](https://5thsrd.org/rules/advantage_and_disadvantage/) mechanic.
* `2d20l` ("roll 2d20 and keep the lowest") similarly corresponds to disadvantage from that system.
* `2d20` simply sums the results of 2 twenty-sided die rolls.
* `4d6h3` ("roll 4d6 and keep the highest 3") corresponds to classic Dungeons and Dragons's [ability score generation](https://www.5esrd.com/using-ability-scores/#Unofficial_Generating_Ability_Scores).

### Quickly Repeating Rolls

A classic method of generating ability scores in most editions of Dungeons and Dragons is to roll 4d6 and sum the 3 highest results 6 times. These rolls make up a character's core 6 ability scores. Polyhedral can do this quickly.

```js
> Polyhedral('4d6h3').sample(6);
[ 11, 9, 13, 16, 12, 8 ]
```

### A Complicated Roll

In 5th edition Dungeons and Dragons, an attack roll is made by rolling a d20 and adding the appropriate ability modifier and proficiency bonus. If you are under the effect of the *bane* spell, you must subtract a d4 from this roll. If you are inspired by a bard, you can add their bardic inspiration die to the roll. Finally, if you have advantage, your d20 roll becomes rolling twice and taking the higher roll.

Say a character has advantage on the attack roll, has a proficiency bonus of +4, an ability score modifier of +3, is effected by *bane*, and is inspired by abard that uses a d10 as their inspiration die. This roll can be carried out by Polyhedral in the ways shown below:

```js
> Polyhedral('2d20h + 4 + 3 - d4 + d10').roll();
24
> Polyhedral('2d20h').plus('4').plus('3').minus('d4').plus('d10').roll();
30
> const attack = Polyhedral('2d20h').plus('4').plus('3').minus('d4').plus('d10');
> attack.roll();
28
```

Further, this can be sampled (or analyzed when I implement it) to get a better idea of the likely outcomes of this roll.

```js
> const results = attack.sample(50);
[ 25,
  31,
  29,
  ...
  19,
  29,
  29 ]
```

We can easily find the observed average of this sample set.

```js
> results.reduce((total, a) => total + a, 0) / 50;
22.4
```
