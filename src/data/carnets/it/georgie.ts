import * as source from "../georgie";
import { localizeData } from "../../../i18n/data";
export type * from "../georgie";

export const georgie: typeof source.georgie = localizeData(source.georgie, "it");
export const indexCover: typeof source.indexCover = localizeData(source.indexCover, "it");
export const indexHeroPhoto: typeof source.indexHeroPhoto = localizeData(source.indexHeroPhoto, "it");
