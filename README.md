# Polyhedral

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A package to roll user-given dice sets and apply modifiers. Built with 5th edition Dungeons and Dragons in mind, this package can accept a string that represents a dice roll and carry out the roll. It can also perform some simple analysis on the distribution of the dice set.

## Structure

This package's strengths lie in its ability to interpret die roll expressions commonly found in tabletop games. An expression is composed of 1 or more "steps" joined by a "+" or "-". A step can either be a die step or mod(ifier) step.

### Mod Steps

These are simply natural numbers. "7", "0", "-3", and "+22" are examples of mod steps.

### Die Steps

These are more complex. A die step requires "dX" to be present, where X is the number of faces on the die. This can be preceded by a coefficient, indicating the number of dice to be rolled. This can be followed by "hY" or "lY" indicating that Polyhedral should keep the Y highest ("h") or lowest ("l") results. Omitting a Y value defaults it to 1.

* "2d20h" ("roll 2d20 and keep the highest") corresponds to 5th-edition Dungeons and Dragons's [advantage](https://5thsrd.org/rules/advantage_and_disadvantage/) mechanic.
* "2d20l" ("roll 2d20 and keep the lowest") similarly corresponds to disadvantage from that system.
* "2d20" simply sums the results of 2 twenty-sided die rolls.
* "4d6h3" ("roll 4d6 and keep the highest 3") corresponds to classic Dungeons and Dragons's [ability score generation](https://www.5esrd.com/using-ability-scores/#Unofficial_Generating_Ability_Scores).



## Documentation

The package contains several functions for rolling and analyzing rolls, and recognizing rolls in strings. The API functions as a chain that builds on previously added rolls.

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

### `Polyhedral.analyze` (not implemented)

### `Polyhedral.english` (not implemented)

### `Polyhedral.match` (not implemented)
