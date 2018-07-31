import { schema } from "normalizr";

export const anime = new schema.Entity("animes");
export const arrayOfAnimes = new schema.Array(anime);
