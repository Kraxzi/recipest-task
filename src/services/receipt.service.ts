import { Request, Response } from "express";
import { client } from "../db/connection";

export class ReceiptService {
  async getReceipts(req: Request, res: Response) {
    try {
      const data = await client("recieps")
        .select(
          "recieps.id",
          "recieps.name",
          "recieps.main_ingredient as mainIngredient",
          "recieps.publish_time as publishTime",
          client.raw("ROUND(AVG(reviews.rating_value), 1) as averageRating")
        )
        .leftJoin("reviews", "recieps.id", "reviews.reciep_id")
        .groupBy("recieps.id")
        .havingRaw("AVG(reviews.rating_value) > ?", 8)
        .limit(20);
      res.status(200).json({ success: true, data });
    } catch (e) {
      console.error(e);
      return res.json({ success: false, message: "Get receipts error" });
    }
  }
}
