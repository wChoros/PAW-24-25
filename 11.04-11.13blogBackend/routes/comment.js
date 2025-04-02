var express = require('express');
var router = express.Router();
var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

// Create a new comment
router.post('/', async (req, res) => {
    const { postId, content, authorName } = req.body;
    const comment = await prisma.comment.create({
        data: {
            postId,
            content,
            authorName: authorName || "John Doe", // Default to "John Doe" if not provided
        },
    });
    res.status(201).json(comment);
});

// Get all comments
router.get('/', async (req, res) => {
    const comments = await prisma.comment.findMany();
    res.status(200).json(comments);
});

// Get a single comment by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const comment = await prisma.comment.findUnique({
        where: { id: parseInt(id) },
    });
    res.status(200).json(comment);
});

// Update a comment by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { postId, content, authorName } = req.body;
    const comment = await prisma.comment.update({
        where: { id: parseInt(id) },
        data: {
            postId,
            content,
            authorName: authorName || "John Doe", // Default to "John Doe" if not provided
        },
    });
    res.status(200).json(comment);
});

// Delete a comment by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.comment.delete({
        where: { id: parseInt(id) },
    });
    res.status(204).send();
});

module.exports = router;