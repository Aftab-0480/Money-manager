const Transaction = require("../models/Transaction");

const addTransaction = async (req, res, next) => {
  try {
    const { type, amount, category, note, date } = req.body;

    // get user from JWT
    const userId = req.user.id;

    // validation
    if (!type || !amount || !category) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({ message: "Invalid transaction type" });
    }

    // create transaction
    const transaction = await Transaction.create({
      user: userId, // from token, not frontend
      type,
      amount,
      category,
      note,
      date,
    });

    res.status(201).json({
      message: "Transaction added successfully",
      transaction,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    const transactions = await Transaction.find({ user: userId });

    res.status(200).json(transactions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSingleTransaction = async (req, res, next) => {
  try {
    const transactionId = req.params.id;
    const userId = req.user.id;
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    if (transaction.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.status(200).json(transaction);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTransaction = async (req, res, next) => {
  try {
    const transactionId = req.params.id;
    const userId = req.user.id;
    const updatedTransaction = req.body;
    const response = await Transaction.findByIdAndUpdate(
      { _id: transactionId, user: userId },
      updatedTransaction,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!response) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json(response);
    console.log("Transaction updated");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTransaction = async (req, res, next) => {
  try {
    const transactionId = req.params.id;
    const userId = req.user.id;
    const transaction = await Transaction.findByIdAndDelete({
      _id: transactionId,
      user: userId,
    });
    if (!transaction) {
      return res.status(404).json({ error: "Transaction Not found" });
    }
    res.status(200).json({message: "Transaction Deleted Successfully"});
    console.log("Transaction Deleted");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const transactions = await Transaction.find({ user: userId });

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((t) => {
      if (t.type === "income") {
        totalIncome += t.amount;
      } else {
        totalExpense += t.amount;
      }
    });

    const balance = totalIncome - totalExpense;

    res.status(200).json({
      totalIncome,
      totalExpense,
      balance
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  getSingleTransaction,
  getSummary,
  updateTransaction,
  deleteTransaction,
};
