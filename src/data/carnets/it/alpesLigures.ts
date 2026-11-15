import * as source from "../alpesLigures";
import { localizeData } from "../../../i18n/data";
export type * from "../alpesLigures";

export const alpesLigures: typeof source.alpesLigures = localizeData(source.alpesLigures, "it");
export const indexCover: typeof source.indexCover = localizeData(source.indexCover, "it");
