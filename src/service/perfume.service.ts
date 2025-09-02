import Perfume from "../models/perfume.model";

const getAllPerfumes = async ({ page = 1, limit = 10 }) => {
  const allPerfumes = await Perfume.find({}).paginate({ page, limit });
  return allPerfumes;
};

const getPerfumeById = async (id: string) => {
  const perfume = await Perfume.findById(id);
  return perfume;
};

export { getAllPerfumes, getPerfumeById };
