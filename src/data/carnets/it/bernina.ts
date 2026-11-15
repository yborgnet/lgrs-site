import * as source from "../bernina";
import { localizeData } from "../../../i18n/data";
export type * from "../bernina";

export const bernina: typeof source.bernina = localizeData(source.bernina, "it");
export const indexCover: typeof source.indexCover = localizeData(source.indexCover, "it");
