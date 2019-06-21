
const router = require('./gamesRouter');
const supertest = require('supertest');
const db = require('../data/dbConfig.js');

describe('router', () => {
    afterAll(async() => {
        await db('users').truncate();
    })

    it('respond with 200 - get - all games', () => {
        return supertest(router)
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/i)
    })
})