import { define, InferredIssue, WantedIssue } from "@/utils/mod.ts";
import z from "zod";

export default define.middleware(async (ctx) => {
	try {
		return await ctx.next();
	} catch (error) {
		if (error instanceof z.ZodError) {
			const accessCookieIssue = error.issues.find((issue) =>
				WantedIssue("invalid_type")(issue) ||
				WantedIssue("invalid_format")(issue)
			);
			if (isJWTIssue(accessCookieIssue)) {
				return Response.redirect(new URL("/", ctx.req.url), 302);
			}
		}

		throw error;
	}
});

function isJWTIssue(issue?: InferredIssue<"invalid_type" | "invalid_format">) {
	const isStringTypeIssue = issue?.code === "invalid_type" &&
		issue.expected === "string";
	const isJwtFormatIssue = issue?.code === "invalid_format" &&
		issue.format === "jwt";

	return isStringTypeIssue && isJwtFormatIssue;
}
