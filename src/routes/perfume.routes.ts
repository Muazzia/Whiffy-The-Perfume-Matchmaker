import { Router, Request, Response } from "express";
import {
  getAllMatchingPerfumes,
  getAllPerfumes,
  getPerfumeById,
} from "../service/perfume.service";
import { sendPaginationSuccess, sendSuccess } from "../utils/response";
import { validateObjectId } from "../utils/validate";

const perfumeRouter = Router();

// GET /perfume - fetch all perfumes
perfumeRouter.get("/", async (req: Request, res: Response) => {
  const paginationOptions = {
    page: parseInt(req.query.page as string) || 1,
    limit: parseInt(req.query.limit as string) || 10,
  };

  const perfumes = await getAllPerfumes(paginationOptions);

  sendPaginationSuccess(res, perfumes, "Perfumes Fetched Successfully");
});

perfumeRouter.get("/search/:query", async (req: Request, res: Response) => {
  const { query } = req.params;
  const paginationOptions = {
    page: parseInt(req.query.page as string) || 1,
    limit: parseInt(req.query.limit as string) || 10,
  };

  const perfumes = await getAllMatchingPerfumes(paginationOptions, query);
  sendPaginationSuccess(res, perfumes, "Perfumes Fetched Successfully");
});

perfumeRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  validateObjectId(id);

  const perfume = await getPerfumeById(id);
  sendSuccess(res, perfume, "Perfume Fetched Successfully");
});

export default perfumeRouter;
