import { z } from "../../deps.ts";
import type { ParamMeta, QueryMeta } from "../shared/symbols/metadata.ts";
import { InputItemHandler } from "../shared/utils/utils.ts";
import type { ClientInit } from "./utils.ts";

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

export async function mayParseAdditionalInit(
	fn: z.ZodFunction,
	args: unknown[],
	init?: Partial<ClientInit>,
): Promise<Partial<ClientInit>> {
	const finalInit: Partial<ClientInit> = init ?? {};
	const items = fn._def.input instanceof z.ZodTuple
		? fn._def.input._zod.def.items
		: [fn._def.input];

	const itemsMeta = items.map(InputItemHandler);
	for (const [i, meta] of itemsMeta.entries()) {
		const item = items[i];
		/**
		 * WORKAROUND: Zod Tuple Skip Bug
		 * * In Zod's ZodTuple.ts, 'optStart' is calculated using findIndex.
		 * If a tuple contains a mix of required and optional/defaulted items,
		 * Zod may calculate an optStart that causes the iterator to 'continue' (skip)
		 * any trailing items if the input array length is shorter than the tuple.
		 * * Because Zod skips the index entirely, inner .default() or .transform()
		 * logic inside a ZodPipe or ZodDefault is never executed.
		 * * We manually force a parse on undefined arguments for Pipe/Defaulted items
		 * to ensure defaults are populated and transforms are applied.
		 */
		let value = args[i];
		if (value === undefined) {
			if (
				item instanceof z.ZodPipe ||
				item instanceof z.ZodDefault ||
				item instanceof z.ZodPrefault
			) {
				value = await z.parseAsync(item, undefined);
			}
		}

		if (meta._tag === "body") {
			if (isUnSerializableBodyType(value)) {
				finalInit.body = value;
			} else {
				finalInit.body = JSON.stringify(value);
			}

			continue;
		}

		if (meta._tag === "header") {
			const headers = (finalInit.headers ?? {}) as Record<
				string,
				string
			>;
			headers[meta.key] = value as string;
			finalInit.headers = headers;
		}
	}

	return finalInit;
}

function isUnSerializableBodyType(value: unknown) {
	return value instanceof URLSearchParams ||
		value instanceof FormData ||
		value instanceof ReadableStream ||
		value instanceof Blob ||
		value instanceof ArrayBuffer;
}
