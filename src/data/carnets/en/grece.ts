import * as source from "../grece";
import { localizeData } from "../../../i18n/data";
export type * from "../grece";

export const grece: typeof source.grece = localizeData(source.grece, "en");
export const indexCover: typeof source.indexCover = localizeData(source.indexCover, "en");
