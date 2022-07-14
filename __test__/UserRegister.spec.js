const request = require('supertest');
const app = require('../src/app');

describe('User Registeration', () => {
  it('Should return 200 OK when signup is valid', (done) => {
    const user = { username: 'boghdady', email: 'boghdady@gmail.com', password: 'Passq123' };
    request(app)
      .post('/api/v1/users')
      .send(user)
      .then((response) => {
        expect(response.status).toBe(201);
        done();
      });
  });

  it('Should return success message when signup is valid', (done) => {
    const user = { username: 'boghdady', email: 'boghdady@gmail.com', password: 'Passq123' };
    request(app)
      .post('/api/v1/users')
      .send(user)
      .then((response) => {
        expect(response.body.message).toBe('User Created successfully');
        done();
      });
  });
});
