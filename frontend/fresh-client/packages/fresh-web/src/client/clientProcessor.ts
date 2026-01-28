import { z } from "../../deps.ts";
import { mayParseAdditionalInit } from "./parsers.ts";
import { buildUrl } from "./urlBuilder.ts";
import {
	$URI,
	type ClientMeta,
	type ClientRawShape,
	getClientMeta,
} from "./utils.ts";

export function ProcessClientSchema<T extends z.ZodObject<ClientRawShape>>(
	schema: T,
): z.infer<typeof schema> {
	const meta = getClientMeta(schema);
	const client = walkClientSchema(meta, schema._zod.def.shape);
	return schema.parse(client);
}

function walkClientSchema(meta: ClientMeta, shape: ClientRawShape) {
	const client: Record<string, object> = {};

	for (const [key, fn] of Object.entries(shape)) {
		const { method, uri } = $URI.get(fn) ?? { method: "GET", uri: "" };

		client[key] = fn.implementAsync(
			async (...args: z.output<typeof fn._def.input>) => {
				const parsedArgs = z.parse(fn._def.input, args);
				const url = buildUrl(meta.base, uri, fn, parsedArgs);
				const finalInit = mayParseAdditionalInit(fn, args, meta.init);
				console.log(finalInit);
				const resp = await fetch(url, {
					...finalInit,
					method,
				});
				if (resp.status >= 400) {
					throw new Error("invalid response status", { cause: resp });
				}

				return await resp.json();
			},
		);
	}

	return client;
}
