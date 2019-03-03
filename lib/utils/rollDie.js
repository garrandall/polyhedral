const rollDieOnce = faces => (Math.floor(Math.random() * faces) + 1);

const rollDie = (faces, effect = null) => {
  if (!faces || faces <= 0) {
    throw Error('number of faces must be greater than 0');
  }
  switch (effect) {
    case 'advantage':
      return Math.max(rollDieOnce(faces), rollDieOnce(faces));
    case 'disadvantage':
      return Math.min(rollDieOnce(faces), rollDieOnce(faces));
    default:
      return rollDieOnce(faces);
  }
};

module.exports = rollDie;
