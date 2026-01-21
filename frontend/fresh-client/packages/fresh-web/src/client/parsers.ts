import { z } from "../../deps.ts";
import type { ParamMeta, QueryMeta } from "../shared/symbols/metadata.ts";
import { InputItemHandler } from "../shared/utils/utils.ts";

export function parseRequestParam<T>(
	uri: string,
	meta: ParamMeta,
	value: T | undefined,
): string {
	if (value == null) {
		throw new Error(`param ${meta.key} cannot be undefined`);
	}
	return uri.replace(`{${meta.key}}`, String(value));
}

export function parseQueryModel<T extends object>(
	uri: string,
	value: T,
	schema: z.ZodObject,
): string {
	const [path, queryStr] = uri.split("?");
	const existing = queryStr ? queryStr.split("&") : [];
	const queries = [...existing];
	const kArgs = new Map(Object.entries(value));
	for (const [key, _] of Object.entries(schema._zod.def.shape)) {
		const arg = kArgs.get(key);
		if (Array.isArray(arg)) {
			queries.push(...arg.map((v) => `${key}=${String(v)}`));
		} else if (arg !== undefined) {
			queries.push(`${key}=${String(arg)}`);
		}
	}

	return `${path}?${queries.join("&")}`;
}

export function parseQuery<T>(
	uri: string,
	meta: QueryMeta,
	value: T | undefined,
): string {
	const [path, queryStr] = uri.split("?");
	const existing = queryStr ? queryStr.split("&") : [];
	const queries = [...existing];

	if (Array.isArray(value)) {
		queries.push(...value.map((v) => `${meta.key}=${String(v)}`));
	} else if (value !== undefined) {
		queries.push(`${meta.key}=${String(value)}`);
	}

	return `${path}?${queries.join("&")}`;
}

export function mayParseFirstBody(fn: z.ZodFunction, args: unknown[]) {
	const items = fn._def.input instanceof z.ZodTuple
		? fn._def.input._zod.def.items
		: [fn._def.input];

	const itemsMeta = items.map(InputItemHandler);
	const multiple = Array.isArray(args);
	let body: null | object = null;
	for (const [i, meta] of itemsMeta.entries()) {
		const item = items[i];

		const value = multiple ? args[i] : args;

		if (meta._tag !== "body") {
			continue;
		}

		if (value && typeof value === "object" && item instanceof z.ZodObject) {
			body = z.parse(item, value);
			break;
		}
	}

	return body;
}
