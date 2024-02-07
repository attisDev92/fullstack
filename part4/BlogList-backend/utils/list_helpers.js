const _ = require('lodash')

const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => {
        return total + blog.likes
    }, 0);
};

const favoriteBlog = (blogs) => {

    let maxLikes = 0;
    let blogFavorite = null;

    blogs.forEach(blog => {
        if(blog.likes > maxLikes) {
            maxLikes = blog.likes;
            blogFavorite = blog;
        }
    });

    return blogFavorite;
};

const mostBlogs = (blogs) => {
    const groupedBlogs = _.groupBy(blogs, 'author');

    const mostBlogsAuthor = _.reduce(groupedBlogs, (currentAuthor, blogsAuthor, author) => {
        if (!currentAuthor || groupedBlogs[currentAuthor].length < blogsAuthor.length) {
            return author
        }
        return currentAuthor
    }, undefined)

    return {
        author: mostBlogsAuthor,
        blogs: groupedBlogs[mostBlogsAuthor].length
    };
};

const mostLikes = (blogs) => {
    const groupedBlogs = _.groupBy(blogs, 'author');

    const authorLikes = _.reduce(groupedBlogs, (authorLikes, blogs, author) => {
        authorLikes[author] = _.reduce(blogs, (totalLikes, blog) => {
        return totalLikes + blog.likes;
        }, 0);
        return authorLikes;
    }, {});
    
    const mostLikesAuthor = _.maxBy(Object.keys(authorLikes), author => authorLikes[author]); 
    
    return {
        author: mostLikesAuthor,
        likes: authorLikes[mostLikesAuthor],
    };
};
      

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};