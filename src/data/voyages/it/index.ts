import * as source from "../index";
import { localizeData } from "../../../i18n/data";
export type * from "../index";

export const voyages: typeof source.voyages = localizeData(source.voyages, "it");
