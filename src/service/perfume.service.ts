import Perfume from "../models/perfume.model";
import { validateObjectId } from "../utils/validate";

const getAllPerfumes = async ({ page = 1, limit = 10 }) => {
  const allPerfumes = await Perfume.find({}).paginate({ page, limit });
  return allPerfumes;
};

const getPerfumeById = async (id: string) => {
  const perfume = await Perfume.findById(id);
  return perfume;
};

const getAllMatchingPerfumes = async (
  { page = 1, limit = 10 },
  query: string
) => {
  const matchingPerfumes = await Perfume.find({
    name: { $regex: query, $options: "i" },
  }).paginate({ page, limit });
  return matchingPerfumes;
};

// ✅ New function: Find similar perfumes by notes
const getSimilarPerfumes = async (id: string, { page = 1, limit = 10 }) => {
  const basePerfume = await Perfume.findById(id);
  if (!basePerfume) throw new Error("Perfume not found");

  const baseNotes = new Set(basePerfume.allNotes);

  // Find perfumes with at least one matching note
  const candidates = await Perfume.find({
    _id: { $ne: id },
    allNotes: { $in: [...baseNotes] },
  });

  // Calculate similarity ratings
  const results = candidates
    .map((perfume) => {
      const notes = new Set(perfume.allNotes);
      const intersection = [...baseNotes].filter((n) => notes.has(n)).length;
      const union = new Set([...baseNotes, ...notes]).size;

      const similarity = intersection / union; // 0–1
      const rating = Math.round(similarity * 10); // scale 1–10

      return {
        perfume,
        similarity,
        rating,
      };
    })
    // ✅ Only keep perfumes with > 5% rating
    .filter((item) => item.rating > 5);

  // Sort by rating (desc) and paginate manually
  results.sort((a, b) => b.rating - a.rating);

  const start = (page - 1) * limit;
  const paginated = results.slice(start, start + limit);

  return {
    total: results.length,
    page,
    limit,
    data: paginated,
  };
};

export {
  getAllPerfumes,
  getPerfumeById,
  getAllMatchingPerfumes,
  getSimilarPerfumes,
};
