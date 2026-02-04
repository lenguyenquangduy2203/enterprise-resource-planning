import type { z } from "../../deps.ts";
import { readResponseBody } from "../shared/utils/utils.ts";
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
) {
	const meta = getClientMeta(schema);
	const client = walkClientSchema(meta, schema._zod.def.shape);
	return client as z.infer<typeof schema>;
}

function walkClientSchema(meta: ClientMeta, shape: ClientRawShape) {
	const client: Record<string, object> = {};

	for (const [key, fn] of Object.entries(shape)) {
		const { method, uri } = $URI.get(fn) ?? { method: "GET", uri: "" };

		client[key] = fn.implementAsync(
			async (...args: z.output<typeof fn._def.input>) => {
				const { base, init } = structuredClone(meta);
				const url = buildUrl(base, uri, fn, args);
				const finalInit = mayParseAdditionalInit(fn, args, init);
				const resp = await fetch(url, {
					...finalInit,
					method,
				});
				if (resp.status >= 400) {
					throw new Error("invalid response status", { cause: resp });
				}

				return await readResponseBody(resp);
			},
		);
	}

	return client;
}
