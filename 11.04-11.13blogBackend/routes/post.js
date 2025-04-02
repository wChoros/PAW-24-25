var express = require('express');
var router = express.Router();
var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

// Get all posts with comments
router.get('/', async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      Category: true,
      Comment: true,
    },
    orderBy: {
      id: 'desc',
    },
  });

  const result = posts.map(post => ({
    id: post.id,
    title: post.title,
    content: post.content,
    published: post.published,
    authorName: post.authorName,
    avatarURL: post.avatarURL,
    category: post.Category ? { id: post.Category.id, name: post.Category.name } : null,
    comments: post.Comment.map(comment => ({
      id: comment.id,
      content: comment.content,
      authorName: comment.authorName,
    })),
  }));

  res.status(200).json(result);
});

// Get a single post by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: {
      Category: true,
      Comment: true,
    },
  });

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const result = {
    id: post.id,
    title: post.title,
    content: post.content,
    published: post.published,
    authorName: post.authorName,
    avatarURL: post.avatarURL,
    category: post.Category ? { id: post.Category.id, name: post.Category.name } : null,
    comments: post.Comment.map(comment => ({
      id: comment.id,
      content: comment.content,
      authorName: comment.authorName,
    })),
  };

  res.status(200).json(result);
});

// Create a new post
router.post('/', async (req, res) => {
  const { title, content, published, authorName, avatarURL, categoryId } = req.body;

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        published,
        authorName,
        avatarURL,
        Category: categoryId ? { connect: { id: categoryId } } : undefined,
      },
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Update an existing post
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, published, authorName, avatarURL, categoryId } = req.body;

  try {
    const updatedPost = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        title,
        content,
        published,
        authorName,
        avatarURL,
        Category: categoryId ? { connect: { id: categoryId } } : undefined,
      },
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.post.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

module.exports = router;