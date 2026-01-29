export { AppController, define, type State } from "./FreshApp.ts";
export {
	extractResource,
	MODULE_RESOURCE_MAP,
	type ModuleName,
} from "./DomainModules.ts";

import { generatePkCE } from "./PkCE.ts";

export const {
	verifier,
	challenge,
} = await generatePkCE();
