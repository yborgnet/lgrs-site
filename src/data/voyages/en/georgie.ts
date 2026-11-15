import * as source from "../georgie";
import { localizeData } from "../../../i18n/data";
export type * from "../georgie";

export const georgie: typeof source.georgie = localizeData(source.georgie, "en");
