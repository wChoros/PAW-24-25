var express = require('express');
var router = express.Router();
var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

// Create a new category
router.post('/', async (req, res) => {
  const { name } = req.body;
  const category = await prisma.category.create({ data: { name } });
  res.status(201).json(category);
});

// Get all categories
router.get('/', async (req, res) => {
  const categories = await prisma.category.findMany();
  res.status(200).json(categories);
});

// Get a single category by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const category = await prisma.category.findUnique({ where: { id: parseInt(id) } });
  res.status(200).json(category);
});

// Update a category by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await prisma.category.update({
    where: { id: parseInt(id) },
    data: { name },
  });
  res.status(200).json(category);
});

// Delete a category by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.category.delete({ where: { id: parseInt(id) } });
  res.status(204).send();
});

module.exports = router;