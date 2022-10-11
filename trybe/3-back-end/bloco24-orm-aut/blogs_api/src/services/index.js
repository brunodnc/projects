const { User, Category, BlogPost } = require('../models');

const findUser = async (email, password) => {
    const user = password ? await User.findOne({ // checks if password arg is present, if it is, checks for user authentication, or else, for repeated email
                where: {
                    email, password,
                    },
                attributes: ['id', 'email'],
                raw: true,
            }) : await User.findOne({ 
                where: {
                    email,
                    },
                attributes: ['id', 'email'],
                raw: true,
            });  
        if (!user) return false;
        return user;
};

const newUser = async ({ displayName, email, password, image }) => {
    const result = await User.create(
        { displayName, email, password, image },
        { attributes: ['id', 'email'], raw: true },
        );
    const user = { id: result.dataValues.id, email: result.dataValues.email };
    return user;
};

const getUsers = async () => {
    const result = await User.findAll(
        { attributes: ['id', 'displayName', 'email', 'image'], raw: true },
        );
    return result;
};

const getUserById = async (id) => {
    const result = await User.findByPk(id, {
        attributes: ['id', 'displayName', 'email', 'image'],
        raw: true });
    return result;
};

const addCategory = async (name) => {
    const result = await Category.create(
        { name },
        { attributes: ['id', 'name'], raw: true },
    );
    return result;
};

const getCategories = async () => {
    const result = await Category.findAll({ raw: true });
    return result;
};

const addBlogPost = async ({ title, content, categoryIds, userId }) => {
    const result = await BlogPost.create(
        { title, content, categoryIds, userId },
        { attributes: ['id', 'title', 'content', 'categoryIds', 'userId'] },
        );
    return result.dataValues;
};

const getBlogPosts = async () => {
    const result = await BlogPost.findAll({ 
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } }, 
            { model: Category, as: 'categories' },
        ],
     });
    return result;
};

const getBlogPostById = async (id) => {
    const result = await BlogPost.findByPk(id, { 
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } }, 
            { model: Category, as: 'categories' },
        ] });
    return result;
};

const updateBlogPost = async (id, title, content) => {
    const [result] = await BlogPost.update({ title, content, updated: new Date().toISOString() }, {
            where: {
                id,
            } });
    return result > 1;
};

module.exports = { 
    findUser,
    newUser,
    getUsers,
    getUserById,
    addCategory,
    getCategories,
    addBlogPost,
    getBlogPosts,
    getBlogPostById,
    updateBlogPost,
 };