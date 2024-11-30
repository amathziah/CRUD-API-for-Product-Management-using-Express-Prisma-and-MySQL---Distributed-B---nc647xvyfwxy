const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/authMiddleware');

const prisma = new PrismaClient();
const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Create Product
router.post('/create', async (req, res) => {
  const { name, stock, price } = req.body;
  if (!name || stock === undefined || price === undefined) {
    return res.status(400).json({ error: "All fields required" });
  }
  try {
    const product = await prisma.product.create({ data: { name, stock, price } });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retrieve All Products
router.get('/get', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retrieve Product by ID
router.get('/getById/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({ where: { id: Number(id) } });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Full Update Product
router.put('/put/:id', async (req, res) => {
  const { id } = req.params;
  const { name, stock, price } = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: { name, stock, price },
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Partial Update Product
router.patch('/patch/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Product
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: "Product is deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
