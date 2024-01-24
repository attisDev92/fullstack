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

    return blogFavorite.title;
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
};