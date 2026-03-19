export { AppController, define, type State } from "./FreshApp.ts";
export {
	extractResource,
	groupByResource,
	MODULE_RESOURCE_MAP,
	ModuleMeta,
	type ModuleName,
} from "./DomainModules.ts";
export { ISODateToISODateTime } from "./mappers.ts";
export { type InferredIssue, WantedIssue } from "./ZodErrors.ts";

import { generatePkCE } from "./PkCE.ts";

export const {
	verifier,
	challenge,
} = await generatePkCE();
