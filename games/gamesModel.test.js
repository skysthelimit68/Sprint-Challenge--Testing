const db = require('../data/dbConfig.js');
const { insert, update, remove, getAll, findById } = require('./gamesModel.js');

describe('test database', () => {
    beforeEach(async() => {
        await db('games').truncate();
    })
    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })
})