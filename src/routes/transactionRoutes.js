const express = require('express');
const router = express.Router();
const {jwtAuthMiddleware, generateToken} = require('../../jwt')
const {
    addTransaction,
    getTransactions,
    getSingleTransaction,
    updateTransaction,
    deleteTransaction
} = require('../controllers/transactionController');

router.post('/', jwtAuthMiddleware, addTransaction);
router.get('/', jwtAuthMiddleware, getTransactions);
router.get('/:id', jwtAuthMiddleware, getSingleTransaction);
router.put('/:id', jwtAuthMiddleware, updateTransaction);
router.delete('/:id', jwtAuthMiddleware, deleteTransaction);

module.exports = router;