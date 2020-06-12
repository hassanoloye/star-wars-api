const centimetersInOneFoot = 30.48;

export const centimetersToFeetAndInches = (centimetres) => {
  const feet = centimetres / centimetersInOneFoot
  const flooredFeet = Math.floor(feet);
  const inches = ((feet - flooredFeet) * 12).toFixed(2)

  return `${flooredFeet} ${flooredFeet > 1 ? 'feet' : 'foot'} ${inches} inches`
}
