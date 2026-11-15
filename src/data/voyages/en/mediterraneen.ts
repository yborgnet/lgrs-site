import * as source from "../mediterraneen";
import { localizeData } from "../../../i18n/data";
export type * from "../mediterraneen";

export const mediterraneen: typeof source.mediterraneen = localizeData(source.mediterraneen, "en");
