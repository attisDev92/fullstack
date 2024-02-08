const favoriteBlog = require('../utils/list_helpers').favoriteBlog;
const helper = require('./test_helpers');

describe('The favorite blog is', () => {

    test('Is the name blog with more likes', () => {
        const result = favoriteBlog(helper.initialBlogs);
        expect(result).toEqual(
            {
                _id: "5a422b3a1b54a676234d17f9",
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                likes: 12,
                __v: 0
            }
        );
    });

}); 