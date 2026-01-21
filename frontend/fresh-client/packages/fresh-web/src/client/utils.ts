import { z } from "../../deps.ts";

export type URIMeta = {
	method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
	uri: string;
};

export const $URI = z.registry<URIMeta, z.ZodFunction>();

export type ClientInit = {
	body?:
		| string
		| ReadableStream<unknown>
		| Blob
		| ArrayBuffer
		| ArrayBufferView<ArrayBuffer>
		| FormData
		| URLSearchParams;
	cache?:
		| "default"
		| "force-cache"
		| "no-cache"
		| "no-store"
		| "only-if-cached"
		| "reload";
	credentials?: "include" | "omit" | "same-origin";
	headers?: [string, string][] | Record<string, string> | Headers;
	integrity: string;
	keepalive: boolean;
	mode?: "same-origin" | "cors" | "navigate" | "no-cors";
	priority?: "auto" | "high" | "low";
	redirect?: "error" | "follow" | "manual";
	referrer: string;
	referrerPolicy?:
		| ""
		| "same-origin"
		| "no-referrer"
		| "no-referrer-when-downgrade"
		| "origin"
		| "origin-when-cross-origin"
		| "strict-origin"
		| "strict-origin-when-cross-origin"
		| "unsafe-url";
	signal: AbortSignal;
	window: null;
};

export type ClientMeta = {
	base: string;
	init?: Partial<ClientInit>;
};

export const $Client = z.registry<ClientMeta, z.ZodObject>();

export function getClientMeta<T extends z.ZodObject>(schema: T): ClientMeta {
	const meta = $Client.get(schema);
	if (!meta) throw new Error("client with no meta");

	return meta as ClientMeta;
}

export type ClientRawShape = { [x: string]: z.ZodFunction };
