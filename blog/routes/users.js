var express = require('express');
var router = express.Router();

// prepare a crud api for the database from the schema.prisma
// import the prisma client
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// GET /users
router.get('/', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

// POST /users
router.post('/', async (req, res) => {
  const { name, email } = req.body
  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  })
  res.json(user)
})

// GET /users/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  })
  res.json(user)
})

// PUT /users/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { name, email } = req.body
  const user = await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
      email,
    },
  })
  res.json(user)
})

// DELETE /users/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const user = await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  })
  res.json(user)
})





module.exports = router;
