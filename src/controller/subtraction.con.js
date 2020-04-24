
import i18n from '../i18n/en';
import * as util from '../utils';

export const QUESTION = 'question';
export const MINUEND = 'minuend';
export const SUBTRAHEND = 'subtrahend';
export const BORROWING = 'borrowing';

export const validate = ({ question, minuend, subtrahend, borrowing }) => {
  borrowing = util.filterBooleanFromString(borrowing);
  const invalid = [];
  if (typeof question !== "number" || question < 1) {
    invalid.push(QUESTION);
  }
  if (typeof minuend !== "number" || (minuend < 1 || minuend > 10)) {
    invalid.push(MINUEND);
  }
  if (typeof subtrahend !== "number" || (subtrahend < 1 || subtrahend > 10) || (subtrahend > minuend)) {
    invalid.push(SUBTRAHEND);
  }
  if (typeof borrowing !== "boolean") {
    invalid.push(BORROWING);
  }
  return invalid;
}

export const apiErrorMessage = (invalidProps) => {
  return invalidProps.map((value) => validInputMessage(value))
}

export const produceQuestions = (numberOfQuestions, minuend, subtrahend, borrowing ) => {
  const questions = [];
  for (let i = 0; i < numberOfQuestions; i++) {
    const question = makeQuestion(minuend, subtrahend, borrowing);
    questions.push(question);
  }
  return questions;
}

export default { validate, apiErrorMessage, produceQuestions }

/* Internal components */

const validInputMessage = (value) => {
  switch (value) {
    case QUESTION: return i18n.validQuestion;
    case MINUEND: return i18n.validMinuend;
    case SUBTRAHEND: return i18n.validSubtrahend;
    case BORROWING: return i18n.validBorrowing;
    default: return '';
  }
}

const generateMinus = (minuend, subtrahend, borrowing) => {

  let a = new Array(minuend).fill(0);
  let b = new Array(subtrahend).fill(0);

  a = a.map((_, index) => {
    if (index === minuend - 1) {
      return util.getRandomInteger(1, 10);
    }
    if (borrowing) {
      return util.getRandomInteger(0, 9);
    }
    return util.getRandomInteger(0, 10);
  })

  if (a[minuend - 1] === 1) {
    borrowing = false;
  }

  b = b.map((_, index) => {
    if (index === minuend - 1) {
      return util.getRandomInteger(1, a[index]);
    }
    if (index === subtrahend - 1) {
      return util.getRandomInteger(1, a[index]);
    }
    if (!borrowing) {
      return util.getRandomInteger(0, a[index]);
    }
    return util.getRandomInteger(a[index] + 1, 10);
  })

  const minuendN = parseInt(a.reverse().join(''));
  const subtrahendN = parseInt(b.reverse().join(''));
  return { minuendN, subtrahendN }
}

const makeQuestion = (minuend, subtrahend, borrowing) => {
  borrowing = util.filterBooleanFromString(borrowing);
  const { minuendN, subtrahendN } = generateMinus(minuend, subtrahend, borrowing);
  const correctAnswer = (minuendN - subtrahendN);
  const options = generateOptions(correctAnswer);
  const question = { minuend: minuendN, subtrahend: subtrahendN, correctAnswer, options };
  return question;
}

const generateOptions = (correctAnswer) => {
  const options = [0,0,0,0];
  const correctIndex = util.getRandomInteger(0, 4);
  const hashmap = {};
  options[correctIndex] = correctAnswer;
  hashmap[correctAnswer] = 1;
  const correctAnswerLength = String(correctAnswer).length;
  return options.map((option, index) => {
    if(index !== correctIndex){
      let option;
      do{
      const pos = util.getRandomInteger(0, correctAnswerLength);
      const addOrSub = util.getRandomInteger(0, 2);
      const difference = util.getRandomInteger(0, 10);
      option =  Math.abs(correctAnswer + (addOrSub*pos*10*difference));
      }while(hashmap[option])
      hashmap[option] = 1;
      return option;
    }
    return option;
  })
}