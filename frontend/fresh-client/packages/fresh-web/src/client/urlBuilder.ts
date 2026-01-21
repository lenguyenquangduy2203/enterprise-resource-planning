import { z } from "../../deps.ts";
import type { MetaData } from "../shared/symbols/metadata.ts";
import { InputItemHandler } from "../shared/utils/utils.ts";
import { parseQuery, parseQueryModel, parseRequestParam } from "./parsers.ts";

export function buildUrl(
	base: string,
	uri: string,
	fn: z.ZodFunction,
	args: unknown[],
): URL {
	let finalUri = uri;

	const items = fn._def.input instanceof z.ZodTuple
		? fn._def.input._zod.def.items
		: [fn._def.input];

	const itemsMeta = items.map(InputItemHandler);
	const multiple = Array.isArray(args);

	for (const [i, meta] of itemsMeta.entries()) {
		const item = items[i];
		const schema = item instanceof z.ZodOptional
			? item._zod.def.innerType
			: item;

		const value = multiple ? args[i] : args;

		finalUri = processURI(
			finalUri,
			meta,
			value,
			schema instanceof z.ZodObject ? schema : undefined,
		);
	}

	return new URL(encodeURI(finalUri), base);
}

function processURI<T>(
	uri: string,
	meta: MetaData,
	value: T | undefined,
	schema?: z.ZodObject,
): string {
	switch (meta._tag) {
		case "param":
			return parseRequestParam(uri, meta, value);

		case "query-model":
			return value && schema ? parseQueryModel(uri, value, schema) : uri;

		case "query":
			return parseQuery(uri, meta, value);

		default:
			return uri;
	}
}
