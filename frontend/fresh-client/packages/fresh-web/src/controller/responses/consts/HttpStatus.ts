export const OK = { code: 200, text: "OK" } as const;
export const Created = { code: 201, text: "Created" } as const;
export const NoContent = { code: 204, text: "No Content" } as const;
export const BadRequest = { code: 400, text: "Bad Request" } as const;
export const Unauthorized = { code: 401, text: "Unauthorized" } as const;
export const ServerError = {
	code: 500,
	text: "Internal Server Error",
} as const;
export const Forbidden = { code: 403, text: "Forbidden" } as const;
export const Conflict = { code: 409, text: "Conflict" } as const;
