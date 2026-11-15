import * as source from "../armenie";
import { localizeData } from "../../../i18n/data";
export type * from "../armenie";

export const armenie: typeof source.armenie = localizeData(source.armenie, "en");
