var express = require('express');
var router = express.Router();

// prepare a crud api for the database from the schema.prisma
// import the prisma client
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

// GET /posts
router.get('/', async (req, res) => {
    const posts = await prisma.post.findMany()
    res.json(posts)
})


// POST /posts
router.post('/', async (req, res) => {
    const {title, content, authorEmail} = req.body
    const post = await prisma.post.create({
        data: {
            title,
            content,
        }
    })
    res.json(post)
})

// GET /posts/:id
router.get('/:id', async (req, res) => {
    const {id} = req.params
    const post = await prisma.post.findUnique({
        where: {
            id: parseInt(id),
        },
    })
    res.json(post)
})

// PUT /posts/:id
router.put('/:id', async (req, res) => {
    const {id} = req.params
    const {title, content} = req.body
    const post = await prisma.post.update({
        where: {
            id: parseInt(id),
        },
        data: {
            title,
            content,
        },
    })
    res.json(post)
})

// DELETE /posts/:id
router.delete('/:id', async (req, res) => {
    const {id} = req.params
    const post = await prisma.post.delete({
        where: {
            id: parseInt(id),
        },
    })
    res.json(post)
})

module.exports = router;
