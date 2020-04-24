import express from 'express';
import subtraction from '../controller/subtraction.con';
import * as api from '../constants/api';
import route from '../constants/routes';

const router = express.Router();

router.post(route.SUBTRACTION, async (req, res) => {
  const { body } = req;

  const invalidProps = subtraction.validate(body);
  if (invalidProps && invalidProps.length) {
    const errorMessage = subtraction.apiErrorMessage(invalidProps);
    res.status(api.BAD_REQUEST).send({ status: 'failure', data: { error: errorMessage } })
    return;
  }
  const { question : numberOfQuestions, minuend, subtrahend, borrowing } = body;
  const data = subtraction.produceQuestions(numberOfQuestions, minuend, subtrahend, borrowing);
  res.status(api.OK).send({ status: 'success', data });
});

router.get('/', (req, res) => {
  res.status(api.OK).send({ status: 'success', message: 'API Service is running'})
});

export default router;