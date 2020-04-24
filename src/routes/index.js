import express from 'express';
import subtraction from '../controller/subtraction.con';
import * as api from '../constants/api';

const router = express.Router();

router.post('/subtraction', async (req, res) => {
  const { body } = req;
  console.log(body)
  const invalidProps = subtraction.validate(body);
  if (invalidProps && invalidProps.length) {
    const errorMessage = subtraction.apiErrorMessage(invalidProps);
    console.log(errorMessage)
    res.status(api.BAD_REQUEST).send({ status: 'failure', data: { error: errorMessage } })
    return;
  }
  const { question : numberOfQuestions, minuend, subtrahend, borrowing } = body;
  const data = subtraction.produceQuestions(numberOfQuestions, minuend, subtrahend, borrowing);
  res.status(api.OK).send({ status: 'success', data });
});

export default router;