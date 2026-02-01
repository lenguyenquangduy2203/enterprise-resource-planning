export { AppController, define, type State } from "./FreshApp.ts";
export {
	extractResource,
	groupByResource,
	MODULE_RESOURCE_MAP,
	ModuleMeta,
	type ModuleName,
} from "./DomainModules.ts";

import { generatePkCE } from "./PkCE.ts";

export const {
	verifier,
	challenge,
} = await generatePkCE();
