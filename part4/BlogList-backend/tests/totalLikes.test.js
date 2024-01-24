const totalLikes = require('../utils/list_helpers').totalLikes;

describe('Total Likes test:', () => {
    const listOneBlog = [
        {
            _id: '123',
            tittle: 'blog 1',
            authot: 'author 1',
            url: 'www.prueba 1.com',
            likes: 5,
            __v: 0
        }
    ];

    test('when list has only one blog, equals the likes of that', () => {
        const result = totalLikes(listOneBlog);
        expect(result).toBe(5)
    });
});