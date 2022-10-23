const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/config/database');
const User = require('../src/user/user.model');

beforeAll(() => {
  return sequelize.sync();
});

beforeEach(() => {
  return User.destroy({ truncate: true });
});

describe('User Registration', () => {
  const postValidUser = () => {
    const user = { username: 'boghdady', email: 'boghdady@gmail.com', password: 'Passq123' };
    return request(app).post('/api/v1/users').send(user);
  };

  it('Should return 201 CREATED when signup is valid', (done) => {
    postValidUser().then((response) => {
      expect(response.status).toBe(201);
      done();
    });
  });

  it('Should return success message when signup request is valid', async () => {
    const response = await postValidUser();
    expect(response.body.message).toBe('User Created successfully');
  });

  it('should save user to database', async () => {
    await postValidUser();
    const usersList = await User.findAll();
    expect(usersList.length).toBe(1);
  });

  it('should saves the username and email to database', async () => {
    await postValidUser();
    const usersList = await User.findAll();

    const savedUser = usersList[0];
    expect(savedUser.email).toBe('boghdady@gmail.com');
    expect(savedUser.username).toBe('boghdady');
  });

  it('should  hashes the password to the database', async () => {
    await postValidUser();
    const usersList = await User.findAll();
    const savedUser = usersList[0];
    expect(savedUser.password).not.toBe('Passq123');
  });
});
