import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const notesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    embedding: {
      type: [Number],
      // In MongoDB Atlas, you’ll configure this as a vector index
    },
  },
  {
    timestamps: true,
  }
);

notesSchema.plugin(mongoosePaginate);

export interface NotesDocument extends mongoose.Document {
  name: string;
  embedding: number[];
}

export interface NotesModel<T extends mongoose.Document>
  extends mongoose.PaginateModel<T> {}

const Notes = mongoose.model<NotesDocument, NotesModel<NotesDocument>>(
  "Notes",
  notesSchema
);
export default Notes;
