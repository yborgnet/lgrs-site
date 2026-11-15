import * as source from "../index";
import { localizeData } from "../../../i18n/data";
export type * from "../index";

export const carnetYears: typeof source.carnetYears = localizeData(source.carnetYears, "en");
export const carnetZones: typeof source.carnetZones = localizeData(source.carnetZones, "en");
export const carnets: typeof source.carnets = localizeData(source.carnets, "en");
