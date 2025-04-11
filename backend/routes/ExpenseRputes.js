const express = require("express");

const {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel,
} = require("../controllers/ExpenseController");

const router = express.Router();
const {protect} = require("../middleware/autMiddleware");

router.post("/addExpense",protect,addExpense);

router.get("/getExpense",protect,getAllExpense);

router.get("/downloadExcelExpense",protect,downloadExpenseExcel);

router.delete("/:id",protect ,deleteExpense);

module.exports=router;


