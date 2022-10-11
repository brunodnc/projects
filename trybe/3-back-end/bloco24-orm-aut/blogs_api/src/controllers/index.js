const service = require('../services');
const { generateToken, tokenValidation } = require('../utils/JWT');

const validateToken = async (req, res, next) => {
    const { authorization } = req.headers;
    const userInfo = await tokenValidation(authorization);
    const { error } = userInfo;
    if (error) return res.status(error.status).json({ message: error.message });
    req.userInfo = userInfo;
    next();
};
const reqError = 'Some required fields are missing';

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: reqError });
    const user = await service.findUser(email, password);
    if (!user) return res.status(400).json({ message: 'Invalid fields' });
    const token = generateToken(user);
    return res.status(200).json({ token });
};

// constantes para função seguinte passar no lint :)
const de = '"displayName" length must be at least 8 characters long';
const pe = '"password" length must be at least 6 characters long';
const ee = '"email" must be a valid email';
const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g; // source: https://regexr.com/3e48o

const addUser = async (req, res) => {
    const { displayName, email, password, image } = req.body;
    if (displayName.length < 8) return res.status(400).json({ message: de });
    if (!regex.test(email)) return res.status(400).json({ message: ee });
    if (password.length < 6) return res.status(400).json({ message: pe });
    const user = await service.findUser(email);
    console.log(`email: ${email} user: ${user}`);
    if (user) return res.status(409).json({ message: 'User already registered' });
    const newUser = await service.newUser({ displayName, email, password, image });
    const token = generateToken(newUser);
    return res.status(201).json({ token });
};

const getUsers = async (req, res) => {
    const users = await service.getUsers();
    console.log(`result getUsers: ${JSON.stringify(users)}`);
    return res.status(200).json(users);
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await service.getUserById(id);
    if (!user) return res.status(404).json({ message: 'User does not exist' });
    return res.status(200).json(user);
};

const addCategory = async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: '"name" is required' });
    const registeredCategory = await service.addCategory(name);
    return res.status(201).json(registeredCategory);
};

const getCategories = async (req, res) => {
    const categories = await service.getCategories();
    return res.status(200).json(categories);
};

const checkCategory = async (categoryIds) => {
    const categories = await service.getCategories();
    const result = categories.map((c) => c.id)
        .filter((c) => categoryIds.some((cid) => cid === c));
    if (result.length >= 1) return true;
    return false;
};

const errorCategory = '"categoryIds" not found';
const addBlogPost = async (req, res) => {
    const { title, content, categoryIds } = req.body;
    if (!title || !content || !(categoryIds instanceof Array)) {
        return res.status(400).json({ message: reqError }); 
    }
    const check = await checkCategory(categoryIds);
    if (!check) return res.status(400).json({ message: errorCategory });
    const userId = req.userInfo.id;
    const blogPost = await service.addBlogPost({ title, content, categoryIds, userId });
    console.log(`id do blogPost do controller: ${JSON.stringify(blogPost)}`);
    return res.status(201).json({ blogPost });
};

const getBlogPosts = async (req, res) => {
    const blogPosts = await service.getBlogPosts();
    return res.status(200).json(blogPosts);
};

const getBlogPostById = async (req, res) => {
    const { id } = req.params;
    const blogPost = await service.getBlogPostById(id);
    if (!blogPost) return res.status(404).json({ message: 'Post does not exist' });
    return res.status(200).json(blogPost);
};

const updateBlogPost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ message: reqError });
    const userId = req.userInfo.id;
    const blogPost = await service.getBlogPostById(id);
    if (userId !== blogPost.userId) return res.status(401).json({ message: 'Unauthorized user' });
    const updatedBlogPost = await service.updateBlogPost(id, title, content);
    if (updatedBlogPost) return getBlogPostById(id);
};

module.exports = {
    login,
    addUser,
    validateToken,
    getUsers,
    getUserById,
    addCategory,
    getCategories,
    addBlogPost,
    getBlogPosts,
    getBlogPostById,
    updateBlogPost,
};