import { App, Context, staticFiles } from "fresh";
import { type State } from "@/utils/mod.ts";

export const app = new App<State>();

app.use((ctx: Context<State>) => {
	ctx.state.url = ctx.req.url;

	return ctx.next();
});
app.use(staticFiles());
app.fsRoutes();
