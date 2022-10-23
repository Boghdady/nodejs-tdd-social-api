const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/config/database');
const User = require('../src/models/user');

beforeAll(() => {
  return sequelize.sync();
});

beforeEach(() => {
  return User.destroy({ truncate: true });
});

describe('User Registration', () => {
  it('Should return 201 CREATED when signup is valid', (done) => {
    const user = { username: 'boghdady', email: 'boghdady@gmail.com', password: 'Passq123' };
    request(app)
      .post('/api/v1/users')
      .send(user)
      .then((response) => {
        expect(response.status).toBe(201);
        done();
      });
  });

  it('Should return success message when signup request is valid', (done) => {
    const user = { username: 'boghdady', email: 'boghdady@gmail.com', password: 'Passq123' };
    request(app)
      .post('/api/v1/users')
      .send(user)
      .then((response) => {
        expect(response.body.message).toBe('User Created successfully');
        done();
      });
  });

  it('should save user to database', (done) => {
    const user = { username: 'boghdady', email: 'boghdady@gmail.com', password: 'Passq123' };
    request(app)
      .post('/api/v1/users')
      .send(user)
      .then(() => {
        User.findAll().then((usersList) => {
          expect(usersList.length).toBe(1);
          done();
        });
      });
  });

  it('should saves the username and email to database', (done) => {
    const user = { username: 'boghdady', email: 'boghdady@gmail.com', password: 'Passq123' };
    request(app)
      .post('/api/v1/users')
      .send(user)
      .then(() => {
        User.findAll().then((usersList) => {
          const savedUser = usersList[0];
          expect(savedUser.email).toBe(user.email);
          expect(savedUser.username).toBe(user.username);
          done();
        });
      });
  });

  it('should  hashes the password to the database', (done) => {
    const user = { username: 'boghdady', email: 'boghdady@gmail.com', password: 'Passq123' };
    request(app)
      .post('/api/v1/users')
      .send(user)
      .then(() => {
        User.findAll().then((usersList) => {
          const savedUser = usersList[0];
          expect(savedUser.password).not.toBe(user.password);
          done();
        });
      });
  });
});
