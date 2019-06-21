
const router = require('../api/server');
const supertest = require('supertest');
const db = require('../data/dbConfig.js');

describe('router', () => {
    afterAll(async() => {
        await db('users').truncate();
    })

    it('respond with 200 - get - all games', async () => {
        const response = await supertest(router).get('/')
        expect(response.status).toEqual(200)
    })

    it('respond with a json object - get - all games', async () => {
        await supertest(router)
        .get('/api/games')
        .expect('Content-Type', /json/i)
    })

    it('respond with an array - get - all games', async() => {
        const response = await supertest(router)
        .get('/api/games');
        console.log(response)
        expect(Array.isArray(response.body)).toBe(true);
    })

    it('respond with 201 - post - add game', async () => {
        const response = await supertest(router)
        .post('/api/games')
        .send({title: 'testgame333', genre: 'testgenr3e'})
        console.log(response.body)
        expect(response.status).toBe(201)
    })

    it('respond with json object - post - add game', async () => {
         await supertest(router)
            .post('/api/games')
            .send({title: 'testgame2', genre: 'testgenre'})
            .expect('Content-Type', /json/i)
    })    
    it('should respond with 422 - post - add game w/ incomplete data', async () => {
        await supertest(router)
            .post('/api/games')
            .send({title: 'testgame123'})
            .expect(422)
        })
})

