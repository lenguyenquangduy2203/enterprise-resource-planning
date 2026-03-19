import { z } from "zod";

export type InferredIssue<C extends z.core.$ZodIssueCode> = z.core.$ZodIssue & {
	code: C;
};

export function WantedIssue<C extends z.core.$ZodIssueCode>(code: C) {
	return (issue: z.core.$ZodIssue): issue is InferredIssue<C> =>
		issue.code === code;
}
