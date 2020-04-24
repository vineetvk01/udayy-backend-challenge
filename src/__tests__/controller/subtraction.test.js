import request from 'supertest';
import app from '../../app';
import routes from '../../constants/routes';

describe('[x] Testing Subtraction service routes.', () => {
  const { API, SUBTRACTION } = routes;

  test('No [GET][PUT][DELETE] Request on the routes', async() => {
    const resg = await request(app).get(`${API}${SUBTRACTION}`);
    const resp = await request(app).put(`${API}${SUBTRACTION}`);
    const resd = await request(app).delete(`${API}${SUBTRACTION}`);
    expect(resg.statusCode).toEqual(404);
    expect(resp.statusCode).toEqual(404);
    expect(resd.statusCode).toEqual(404);
  });

  test('[POST] Route providing correct response for 1 response', async() => { 
    const res = await request(app).post(`${API}${SUBTRACTION}`).send({question:1, minuend: 5, subtrahend: 4, borrowing: false});
    const { body : { status, data} } = res;
    expect(status).toBe('success');
    expect(data.length).toBe(1);

    const { minuend, subtrahend, correctAnswer, options } = data[0];

    expect(String(minuend).length).toBe(5);
    expect(String(subtrahend).length).toBe(4);
    expect(minuend - subtrahend).toBe(correctAnswer);
    const optionsIncludeCorrectAnswer = (String(options).split(',').includes(String(correctAnswer)));
    expect(optionsIncludeCorrectAnswer).toEqual(true);

  });

  test('[POST] Route providing correct response for 10 response', async() => { 
    const res = await request(app).post(`${API}${SUBTRACTION}`).send({question:10, minuend: 5, subtrahend: 4, borrowing: false});
    const { body : { status, data} } = res;
    expect(status).toBe('success');
    expect(data.length).toBe(10);
  });

  test('[POST] Route providing correct response for 50 response', async() => { 
    const res = await request(app).post(`${API}${SUBTRACTION}`).send({question:50, minuend: 5, subtrahend: 4, borrowing: false});
    const { body : { status, data} } = res;
    expect(status).toBe('success');
    expect(data.length).toBe(50);
  });

  test('[POST] Route providing correct response BORROWING = false', async() => { 
    const res = await request(app).post(`${API}${SUBTRACTION}`).send({question:1, minuend: 5, subtrahend: 5, borrowing: false});
    const { body : { status, data} } = res;
    expect(status).toBe('success');
    expect(data.length).toBe(1);

    const { minuend, subtrahend } = data[0];
    let minuend_String = String(minuend).slice(1);
    let subtrahend_String = String(subtrahend).slice(1);

    const positiveValue = minuend_String - subtrahend_String > 0;
    expect(positiveValue).toBe(true);
  });

  test('[POST] Route providing correct response BORROWING = true', async() => { 
    const res = await request(app).post(`${API}${SUBTRACTION}`).send({question:1, minuend: 5, subtrahend: 5, borrowing: true});
    const { body : { status, data} } = res;
    expect(status).toBe('success');
    expect(data.length).toBe(1);

    const { minuend, subtrahend } = data[0];
    let minuendA = String(minuend).split('');
    let subtrahendA = String(subtrahend).split('');
    let anyNumberBigger = false;
    minuendA.forEach((value, index) => {
      if(parseInt(subtrahendA[index]) > parseInt(value)){
        anyNumberBigger = true;
      }
    })
    expect(anyNumberBigger).toBe(true);

  });

  test('Wrong input should cause Bad Request', async () => {
    const res = await request(app).post(`${API}${SUBTRACTION}`).send({question:'s'})
    const { body : { status, data} } = res;
    expect(status).toBe('failure');
  })

});