import type { Cookie } from "@std/http";
import { CommonHeaders, HttpStatus } from "./consts/mod.ts";

type Props<T> = {
	body?: T | null;
	cookies?: Cookie[];
	headersInit?: HeadersInit;
	status?: {
		code: number;
		text: string;
	};
};

export class ResponseEntity<T> {
	body?: T | null;
	cookies?: Cookie[];
	headersInit?: HeadersInit;
	status?: {
		code: number;
		text: string;
	};

	constructor({ body, cookies, headersInit, status }: Props<T>) {
		this.body = body;
		this.cookies = cookies;
		this.headersInit = headersInit;
		this.status = status;
	}

	/** Chainable method to add a header after creation */
	withHeader(name: string, value: string): this {
		this.headersInit = { ...this.headersInit, [name]: value };
		return this;
	}

	/** Chainable method to add a cookie after creation */
	withCookie(cookie: Cookie): this {
		this.cookies = [...(this.cookies ?? []), cookie];
		return this;
	}

	/** 200 OK with JSON Body */
	static readonly ok = <T>(body: T, cookies?: Cookie[]): ResponseEntity<T> =>
		new ResponseEntity({
			body,
			cookies,
			headersInit: { ...CommonHeaders.Json },
			status: HttpStatus.OK,
		});

	/** 201 Created with JSON Body */
	static readonly created = <T>(
		body: T,
		cookies?: Cookie[],
	): ResponseEntity<T> =>
		new ResponseEntity({
			body,
			cookies,
			headersInit: { ...CommonHeaders.Json },
			status: HttpStatus.Created,
		});

	/** 204 No Content - Strictly enforces no body */
	static readonly noContent = (cookies?: Cookie[]): ResponseEntity<never> =>
		new ResponseEntity({
			cookies,
			status: HttpStatus.NoContent,
			// No Content-Type needed for 204
		});

	/** 400 Bad Request with Error Object */
	static readonly badRequest = (
		error: string | object,
	): ResponseEntity<string | object> =>
		new ResponseEntity({
			body: typeof error === "string" ? { error } : error,
			headersInit: { ...CommonHeaders.Json },
			status: HttpStatus.BadRequest,
		});

	/** 401 Unauthorized with automatic Cache-Control */
	static readonly unauthorized = (
		message = "Unauthorized",
	): ResponseEntity<{ message: string }> =>
		new ResponseEntity({
			body: { message },
			headersInit: { ...CommonHeaders.Json, ...CommonHeaders.NoCache },
			status: HttpStatus.Unauthorized,
		});

	/** 403 Forbidden - For valid credentials but insufficient permissions */
	static readonly forbidden = (
		message = "Forbidden",
	): ResponseEntity<{ message: string }> =>
		new ResponseEntity({
			body: { message },
			headersInit: { ...CommonHeaders.Json },
			status: HttpStatus.Forbidden,
		});

	/** 409 Conflict - Perfect for "User already exists" or "Version mismatch" */
	static readonly conflict = <T>(body: T): ResponseEntity<T> =>
		new ResponseEntity({
			body,
			headersInit: { ...CommonHeaders.Json },
			status: HttpStatus.Conflict,
		});

	/** 302 Found/Redirect - Crucial for Auth flows and Form submissions */
	static readonly redirect = (
		url: string,
		cookies?: Cookie[],
	): ResponseEntity<null> =>
		new ResponseEntity({
			body: null,
			cookies,
			headersInit: { "Location": url },
			status: { code: 302, text: "Found" },
		});

	/** 500 Internal Server Error - A safe way to catch unexpected errors */
	static readonly internalError = (
		message = "An unexpected error occurred",
	): ResponseEntity<{ error: string }> =>
		new ResponseEntity({
			body: { error: message },
			headersInit: { ...CommonHeaders.Json, ...CommonHeaders.NoCache },
			status: HttpStatus.ServerError,
		});
}
