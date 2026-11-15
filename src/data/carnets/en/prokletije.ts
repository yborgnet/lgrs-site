import * as source from "../prokletije";
import { localizeData } from "../../../i18n/data";
export type * from "../prokletije";

export const indexCover: typeof source.indexCover = localizeData(source.indexCover, "en");
export const prokletije: typeof source.prokletije = localizeData(source.prokletije, "en");
