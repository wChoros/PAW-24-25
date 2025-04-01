var express = require('express');
var router = express.Router();
var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

// Create a new post
router.post('/', async (req, res) => {
  const { title, content, published, authorId, categoryId } = req.body;
  const post = await prisma.post.create({
    data: { title, content, published, authorId, categoryId },
  });
  res.status(201).json(post);
});

// Get all posts
router.get('/', async (req, res) => {
  const posts = await prisma.post.findMany();
  res.status(200).json(posts);
});

// Get a single post by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });
  res.status(200).json(post);
});

// Update a post by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, published, authorId, categoryId } = req.body;
  const post = await prisma.post.update({
    where: { id: parseInt(id) },
    data: { title, content, published, authorId, categoryId },
  });
  res.status(200).json(post);
});

// Delete a post by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.post.delete({ where: { id: parseInt(id) } });
  res.status(204).send();
});

module.exports = router;