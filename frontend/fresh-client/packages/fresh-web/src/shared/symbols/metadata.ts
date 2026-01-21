import type { Context } from "../../../deps.ts";

export type HeadersInit = Headers | [string, string][] | Record<string, string>;

export type PageResponse<T> = {
	data: T;
	headers?: HeadersInit;
	status?: number;
};

export type ParamMeta = { _tag: "param"; key: string };
export type QueryModelMeta = { _tag: "query-model" };
export type QueryMeta = { _tag: "query"; key: string };
export type FormMeta = { _tag: "form" };
export type HeaderMeta = { _tag: "header"; key: string };
export type CookieMeta = { _tag: "cookie"; key: string };
export type BodyMeta = { _tag: "body" };
export type StateMeta = { _tag: "state"; key: string };

export type MetaData =
	| ParamMeta
	| QueryModelMeta
	| QueryMeta
	| FormMeta
	| HeaderMeta
	| CookieMeta
	| BodyMeta
	| StateMeta;

export type Meta = {
	[M in MetaData as M["_tag"]]: M;
};

export type MetaHandler<M extends keyof Meta> = (meta: Meta[M]) => unknown;

export type MetaHandlerMux<
	State extends Record<string, unknown> = Record<string, unknown>,
> = {
	[M in keyof Meta]: (ctx: Context<State>) => MetaHandler<M>;
};
