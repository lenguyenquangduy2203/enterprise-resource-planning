import type { Context, HandlerFn, z } from "../../deps.ts";
import {
	InputItemHandler,
	parseRequestBody,
	readResponseBody,
} from "../shared/utils/utils.ts";
import type {
	Meta,
	MetaData,
	MetaHandler,
	MetaHandlerMux,
	PageResponse,
} from "../shared/symbols/metadata.ts";
import { getCookies } from "../../deps.ts";

function getDefaultMetaHandlerMux<
	State extends Record<string, unknown> = Record<string, unknown>,
>(ctx: Context<State>) {
	const DefaultMetaHandlerMux: MetaHandlerMux<State> = {
		param: (ctx) => (meta) => ctx.params[meta.key],
		"query-model": (ctx) => () => {
			const data: Record<string, unknown> = {};
			// eslint-disable-next-line no-array-for-each
			ctx.url.searchParams.forEach((value, key) => {
				if (!value?.trim()) return;

				const valueAsNumber = Number(value);
				if (Number.isNaN(valueAsNumber)) {
					data[key] = value;
				} else {
					data[key] = valueAsNumber;
				}
			});

			return data;
		},
		query: (ctx) => (meta) => ctx.url.searchParams.get(meta.key),
		form: (ctx) => () => {
			if (ctx.req.method.toUpperCase() === "GET") {
				const data: Record<string, unknown> = {};
				// eslint-disable-next-line no-array-for-each
				ctx.url.searchParams.forEach((value, key) => {
					data[key] = value;
				});

				return data;
			} else {
				return ctx.data;
			}
		},
		header: (ctx) => (meta) => ctx.req.headers.get(meta.key),
		cookie: (ctx) => (meta) => getCookies(ctx.req.headers)[meta.key],
		body: (ctx) => () => ctx.data,
		state: (ctx) => (meta) => ctx.state[meta.key],
	};
	return (tag: keyof Meta) =>
		DefaultMetaHandlerMux[tag](ctx) as MetaHandler<typeof tag>;
}

type ControllerOutput<T> =
	| Response
	| PageResponse<T>
	| Promise<Response | PageResponse<T>>;

export function WithAppContext<State extends Record<string, unknown>>() {
	return <Input extends z.ZodTuple, Output extends z.ZodType>(
		schema: z.ZodFunction<Input, Output>,
	) => {
		const input = schema._def.input;
		const keys = input._zod.def.items.map(InputItemHandler);

		return (
			impl: (
				...args: z.output<Input>
			) => ControllerOutput<z.input<Output>>,
		): HandlerFn<z.input<Output>, State> =>
		async (ctx) => {
			ctx.data = await parseRequestBody(ctx.req);
			const mux = (meta: MetaData) =>
				getDefaultMetaHandlerMux<State>(ctx)(meta._tag)(meta);

			const args = keys.map(mux);
			const parsed = input.parse(args);

			const result = await impl(...parsed);

			let body: unknown;
			if (result instanceof Response) {
				body = await readResponseBody(result);
			} else {
				body = result.data;
			}

			const _ = await schema._def.output.parseAsync(body);

			return result;
		};
	};
}
