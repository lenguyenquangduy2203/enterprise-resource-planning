import { createDefine } from "fresh";
import { WithAppContext } from "@fresh-web/mod.ts";

// This specifies the type of "ctx.state" which is used to share
// data among middlewares, layouts and routes.
export type State = {
	url: string;
};

export const define = createDefine<State>();
export const AppController = WithAppContext<State>();
