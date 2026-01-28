import { z } from "../deps.ts";
import {
	$Client,
	$Header,
	$Param,
	$Query,
	$QueryModel,
	$URI,
	ProcessClientSchema,
} from "../mod.ts";

const UserSchema = z.object({
	id: z.uuid(),
	username: z.string().nonempty(),
	email: z.email(),
});

const UserQuerySchema = UserSchema.partial();

const APITokenHeader = z.string().nonempty().transform((tok) =>
	`Bearer ${tok}`
);

const UserClientSchema = z.object({
	getUser: z.function({
		input: z.tuple([
			APITokenHeader.register($Header, {
				_tag: "header",
				key: "X-API-Key",
			}),
			z.uuid().register($Param, { _tag: "param", key: "id" }),
		]),
		output: z.promise(UserSchema),
	}).register($URI, { method: "GET", uri: "/users/{id}" }),
	findUser: z.function({
		input: z.tuple([
			APITokenHeader.register($Header, {
				_tag: "header",
				key: "X-API-Key",
			}),
			z.string().register($Query, { _tag: "query", key: "username" }),
			z.email().register($Query, { _tag: "query", key: "email" }),
		]),
		output: z.promise(UserSchema),
	}).register($URI, { method: "GET", uri: "/users" }),
	findUsersMatchUsername: z.function({
		input: z.tuple([
			APITokenHeader.register($Header, {
				_tag: "header",
				key: "X-API-Key",
			}),
			z.array(z.string()).register($Query, {
				_tag: "query",
				key: "username",
			}),
		]),
		output: z.promise(UserSchema),
	}).register($URI, { method: "GET", uri: "/users" }),
	findUsersMatch: z.function({
		input: z.tuple([
			APITokenHeader.register($Header, {
				_tag: "header",
				key: "X-API-Key",
			}),
			z.array(z.string()).register($Query, {
				_tag: "query",
				key: "username",
			}),
			z.array(z.email()).register($Query, {
				_tag: "query",
				key: "email",
			}),
		]),
		output: z.promise(UserSchema),
	}).register($URI, { method: "GET", uri: "/users" }),
	searchUsers: z.function({
		input: z.tuple([
			APITokenHeader.register($Header, {
				_tag: "header",
				key: "X-API-Key",
			}),
			z.number().nonnegative().register($Query, {
				_tag: "query",
				key: "page",
			}),
			z.number().nonnegative().register($Query, {
				_tag: "query",
				key: "size",
			}),
			z.optional(UserQuerySchema).register($QueryModel, {
				_tag: "query-model",
			}),
		]),
		output: z.promise(z.array(UserSchema)),
	}).register($URI, { method: "GET", uri: "/users/search" }),
}).register($Client, {
	base: "http://localhost:8080",
	init: {
		headers: { "Content-Type": "application/json" },
	},
});

const UserClient = ProcessClientSchema(UserClientSchema);

async function safeRun<R>(id: string, fn: () => R) {
	try {
		await fn();
	} catch (e) {
		console.error(`[${id}] ${(e as Error).message}`);
	}
}

const MyToken = "abc-xyz";

await safeRun(
	"getUser",
	() => UserClient.getUser(MyToken, crypto.randomUUID()),
);
await safeRun(
	"findUser",
	() => UserClient.findUser(MyToken, "Landon Park", "guwjeb@famnejim.tj"),
);
await safeRun(
	"findUsersMatchUsername",
	() =>
		UserClient.findUsersMatchUsername(MyToken, [
			"Scott Warner",
			"Francis Marshall",
			"Harriet Peters",
		]),
);
await safeRun(
	"findUsersMatch",
	() =>
		UserClient.findUsersMatch(MyToken, ["Rhoda Dennis", "Ralph Soto"], [
			"bipu@okpa.sa",
			"aplal@wa.no",
			"cozmevnag@fa.rw",
		]),
);
await safeRun(
	"searchUsers",
	() =>
		UserClient.searchUsers(MyToken, 0, 20, {
			id: crypto.randomUUID(),
			email: "deswew@fuuzkar.to",
			username: "Francis",
		}),
);
