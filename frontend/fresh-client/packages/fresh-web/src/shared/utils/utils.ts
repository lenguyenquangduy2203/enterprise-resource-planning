import { ControllerRegistries } from "../symbols/registry.ts";
import type { MetaData } from "../symbols/metadata.ts";
import type { z } from "../../../deps.ts";
import { CookiePolicies } from "../../controller/responses/consts/mod.ts";
import type { Cookie } from "@std/http";

export function InputItemHandler<T extends z.core.$ZodType>(item: T): MetaData {
	for (const $Registry of ControllerRegistries) {
		const meta = $Registry.get(item);
		if (meta) return meta;
	}
	throw new Error("Unknown input item");
}

export async function readResponseBody(response: Response): Promise<unknown> {
	const res = response.clone();
	// Status codes that forbid bodies by spec
	if (res.status === 204 || res.status === 205 || res.status === 304) {
		return undefined;
	}

	// Read ONCE
	let text: string;
	try {
		text = await res.text();
	} catch {
		return undefined;
	}

	// No bytes were sent
	if (!text || text.trim() === "") {
		return undefined;
	}

	// Opportunistic JSON parse
	const trimmed = text.trim();
	if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
		try {
			return JSON.parse(trimmed);
		} catch {
			// fall through
		}
	}

	return text;
}

export async function parseRequestBody(req: Request) {
	try {
		return await req.clone().json();
	} catch {
		try {
			const formData = await req.clone().formData();
			const obj: Record<string, unknown> = {};
			// eslint-disable-next-line no-array-for-each
			formData.forEach((value, key) => {
				obj[key] = value.valueOf();
			});

			return obj;
		} catch {
			return undefined;
		}
	}
}

export const CreateCookie = (
	name: string,
	value: string,
	policy: keyof typeof CookiePolicies = "StrictSession",
): Cookie => ({
	name,
	value,
	...CookiePolicies[policy],
});
