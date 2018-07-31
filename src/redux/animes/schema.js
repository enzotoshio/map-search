import { schema } from "normalizr";

export const anime = new schema.Entity("animes", {}, { idAttribute: "malId" });
export const arrayOfAnimes = new schema.Array(anime);
