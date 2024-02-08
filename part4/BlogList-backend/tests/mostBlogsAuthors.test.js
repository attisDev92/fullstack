const {mostBlogs, mostLikes} = require('../utils/list_helpers');
const helper = require('./test_helpers');

describe('authors with most likes and most blogs', () => {

    test('Author with most blogs from collection', () => {
        const result = mostBlogs(helper.initialBlogs);

        const expectResult = {
            author: "Robert C. Martin",
            blogs: 3
        }

        expect(result).toEqual(expectResult);
    });

    test('Author with most likes from collection', () => {
        const result = mostLikes(helper.initialBlogs);

        const expectResult = {
            author: "Edsger W. Dijkstra",
            likes: 17
        };

        expect(result).toEqual(expectResult);
    });

}); 