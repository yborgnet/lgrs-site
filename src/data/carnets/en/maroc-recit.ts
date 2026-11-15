import * as source from "../maroc-recit";
import { localizeData } from "../../../i18n/data";
export type * from "../maroc-recit";

export const MAROC_BROKEN: typeof source.MAROC_BROKEN = localizeData(source.MAROC_BROKEN, "en");
export const marocRecit: typeof source.marocRecit = localizeData(source.marocRecit, "en");
export const photo = (...args: Parameters<typeof source.photo>): ReturnType<typeof source.photo> => localizeData(source.photo(...args), "en");
