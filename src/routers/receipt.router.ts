import express from "express";
import { ReceiptService } from "../services/receipt.service";

const service = new ReceiptService();
export const receiptRouter = express.Router();

receiptRouter.get("/", service.getReceipts);
