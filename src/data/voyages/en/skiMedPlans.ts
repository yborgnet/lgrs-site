import * as source from "../skiMedPlans";
import { localizeData } from "../../../i18n/data";
export type * from "../skiMedPlans";

export const plans: typeof source.plans = localizeData(source.plans, "en");
export const plansSection: typeof source.plansSection = localizeData(source.plansSection, "en");
