const express = require("express");

const {
    addIncome,
    getAllIncome,
    deleteIncome,
    donwloadIncomeExcel,
} = require("../controllers/IncomeController");

const router = express.Router();
const {protect} = require("../middleware/autMiddleware");

router.post("/addIncome",protect,addIncome);

router.get("/getIncome",protect,getAllIncome);

router.get("/downloadIncomeExcel",protect,donwloadIncomeExcel);

router.delete("/:id",protect ,deleteIncome);

module.exports=router;


