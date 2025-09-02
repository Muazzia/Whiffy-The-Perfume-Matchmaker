import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const perfumeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    notes: {
      top: [{ type: String, required: true }],
      middle: [{ type: String, required: true }],
      base: [{ type: String, required: true }],
    },

    allNotes: {
      type: [String],
      required: true,
      index: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    embedding: {
      type: [Number],
      // In MongoDB Atlas, you’ll configure this as a vector index
    },
  },
  {
    timestamps: true,
  }
);

// Middleware: when saving, always build allNotes
perfumeSchema.pre("save", function (next) {
  this.allNotes = [
    ...(this.notes?.top || []),
    ...(this.notes?.middle || []),
    ...(this.notes?.base || []),
  ];
  next();
});

perfumeSchema.plugin(mongoosePaginate);

export interface PerfumeDocument extends mongoose.Document {
  name: string;
  brand: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
}

export interface PerfumeModel<T extends mongoose.Document>
  extends mongoose.PaginateModel<T> {}

const Perfume = mongoose.model<PerfumeDocument, PerfumeModel<PerfumeDocument>>(
  "Perfume",
  perfumeSchema
);
export default Perfume;
