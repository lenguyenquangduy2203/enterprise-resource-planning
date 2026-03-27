import { setCookie } from "@std/http";
import { type Context, z } from "../deps.ts";
import {
	$Param,
	CreateCookie,
	ResponseEntity,
	WithAppContext,
} from "../mod.ts";

const NoContent = z.union([z.undefined(), z.null()]);

const SimpleEchoControllerSchema = z.function({
	input: z.tuple([
		z.string().register($Param, { _tag: "param", key: "value" }),
	]),
	output: NoContent,
});

const SimpleEchoController = WithAppContext()(SimpleEchoControllerSchema);

/**
 * Newly added, avoid redundant response.json() parse for output validation.
 *
 * Having supported ResponseEntity APIs to create returns with ease.
 */
const returnResponseEntity = SimpleEchoController((value) => {
	console.log("Received:", value);

	// return ResponseEntity.ok(value)
	return ResponseEntity.ok(undefined)
		.withCookie(CreateCookie("type", "echo"));
});

/**
 * Old way to return a http response, procedure-oriented Response creation.
 *
 * Require parsing response's body after serialize for validation (inefficient).
 */
const returnResponse = SimpleEchoController((value) => {
	console.log("Received:", value);
	const headers = new Headers({ "content-type": "application/json" });
	setCookie(headers, {
		name: "type",
		value: "echo",
		httpOnly: true,
		secure: true,
		sameSite: "Strict",
		path: "/",
	});

	return new Response(undefined, { headers });
});

/**
 * Fresh's response format for a html page properties.
 *
 * Easy to validate data but hard to add complex headers.
 */
const returnPageResponse = SimpleEchoController((value) => {
	console.log("Received:", value);

	return {
		data: null,
		headers: {
			"content-type": "text/html",
			"set-cookie":
				"type=echo; Secure; HttpOnly; SameSite=Strict; Path=/",
		},
	};
});

const ctx = {
	params: {
		value: "ok",
	},
} as unknown as Context<Record<string, unknown>>;

console.log(await returnResponseEntity(ctx));
console.log(await returnResponse(ctx));
console.log(await returnPageResponse(ctx));
