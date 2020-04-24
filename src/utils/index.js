export const filterBooleanFromString = (mayBeBoolean) => {
  if(typeof mayBeBoolean === 'string'){
    if(mayBeBoolean.toLowerCase() === 'true'){
      return true;
    }
    if(mayBeBoolean.toLowerCase() === 'false'){
      return false;
    }
  }
  return mayBeBoolean;
}

export const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min) ) + min;
}