import { z } from "zod";
import { $Body, $Client, $Param, $URI, ProcessClientSchema } from "../mod.ts";

const ClientWithDefArgsSchema = z.object({
	next: z.function({
		input: z.tuple([
			z.string().trim().nonempty().register($Param, {
				_tag: "param",
				key: "id",
			}),
			z.literal(["START", "REFRESH", "END"]).default("START")
				.transform((state) => {
					console.log("Running 1st pipe");
					return ({ state });
				})
				.transform((body) => {
					console.log("Running 2nd pipe");
					return ({
						...body,
						idempotentKey: crypto.randomUUID(),
					});
				})
				.register(
					$Body,
					{ _tag: "body" },
				),
		]).rest(z.unknown()),
		output: z.promise(z.null()),
	}).register($URI, { method: "POST", uri: "/transitions/{id}/next" }),
	echo: z.function({
		input: z.tuple([
			z.string().trim().nonempty().default("Hello").register(
				$Param,
				{
					_tag: "param",
					key: "msg",
				},
			),
			z.object({
				sender: z.string(),
			}).default({ sender: "Anonymous" }).transform(({ sender }) => {
				console.log("If you see me twice, it is functioning wrong!");
				return { sender, idempotentKey: crypto.randomUUID() };
			}).register(
				$Body,
				{ _tag: "body" },
			),
		]).rest(z.unknown()),
		output: z.promise(z.string().trim().nonempty()),
	}).register($URI, { method: "POST", uri: "/echo/{msg}" }),
}).register($Client, { base: "http://localhost:8080" });

const client = ProcessClientSchema(ClientWithDefArgsSchema);

async function safeRun<R>(id: string, fn: () => R) {
	try {
		await fn();
	} catch (e) {
		console.error(`[${id}] ${(e as Error).message}`);
	}
}

await safeRun("Echo", () => client.echo("Good evening!"));

await safeRun("Next", () => client.next("xyz"));
