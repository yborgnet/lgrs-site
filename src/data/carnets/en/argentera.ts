import * as source from "../argentera";
import { localizeData } from "../../../i18n/data";
export type * from "../argentera";

export const argentera: typeof source.argentera = localizeData(source.argentera, "en");
export const indexCover: typeof source.indexCover = localizeData(source.indexCover, "en");
