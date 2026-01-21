import { ControllerRegistries } from "../symbols/registry.ts";
import type { MetaData } from "../symbols/metadata.ts";
import type { z } from "../../../deps.ts";

export function InputItemHandler<T extends z.core.$ZodType>(item: T): MetaData {
	for (const $Registry of ControllerRegistries) {
		const meta = $Registry.get(item);
		if (meta) return meta;
	}
	throw new Error("Unknown input item");
}

export async function readResponseBody(res: Response): Promise<unknown> {
	try {
		return await res.clone().json();
	} catch {
		try {
			return await res.clone().text();
		} catch {
			return res.clone().body;
		}
	}
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
