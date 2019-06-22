
const router = require('../api/server');
const supertest = require('supertest');
const db = require('../data/dbConfig.js');

describe('router', () => {
    afterAll(async() => {
        await db('users').truncate();
    })

    it('should respond with 200 - get - all games', async () => {
        const response = await supertest(router).get('/')
        expect(response.status).toEqual(200)
    })

    it('should respond with a json object - get - all games', async () => {
        await supertest(router)
        .get('/api/games')
        .expect('Content-Type', /json/i)
    })

    it('should respond with an array - get - all games', async() => {
        const response = await supertest(router)
        .get('/api/games');
        expect(Array.isArray(response.body)).toBe(true);
    })

    it('should respond with 201 - post - add game', async () => {
        const response = await supertest(router)
        .post('/api/games')
        .send({title: 'testgame333', genre: 'testgenr3e'})
        expect(response.status).toBe(201)
    })

    it('should respond with json object - post - add game', async () => {
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
    it('should respond with 405 - post - add game w/ title already existed', async() => {
        await supertest(router)
            .post('/api/games')
            .send({title: 'testgame333', genre: 'testgenre'})
            .expect(405)
    })
    it('should respond with 200 - get - get game by id', async () => {
        await supertest(router)
            .get('/api/games/1')
            .expect(200)
    })
    it('should respond with 404 - get - get game by invalid id', async() => {
        await supertest(router)
            .get('/api/games/888')
            .expect(404)
    })
    it('should repond with 200 - delete - delete by id', async() => {
        await supertest(router)
            .delete('/api/games/1')
            .expect(200)
    })
    it('should respond with 404 - delete - delete game by invalid id', async() => {
        await supertest(router)
            .delete('/api/games/888')
            .expect(404)
    })
})

