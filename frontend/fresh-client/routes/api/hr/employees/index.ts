import { define } from "@/utils/mod.ts";

export const handler = define.handlers({
	POST: () => {
		console.log("Accept create employee request!");
		return new Response(null, { status: 202 });
	},
});
