import { define, groupByResource } from "@/utils/mod.ts";
import { HomeController } from "@/controllers/analysis/HomeController.ts";
import {
	PoliciesClient,
	PoliciesSchema,
} from "@/http-clients/auth/PoliciesClient.ts";
import { Head } from "fresh/runtime";
import z from "zod";
import { PageProps } from "fresh";
import Container from "@/islands/analysis/Container.tsx";

export const handler = define.handlers({
	GET: HomeController(async (accessToken) => {
		const policies = await PoliciesClient.getJwtPolicies(accessToken);

		return { data: policies };
	}),
});

export default define.page(
	({ data }: PageProps<z.infer<typeof PoliciesSchema>>) => {
		const resourceActionsRecord = groupByResource(
			"analysis",
			data.permissions,
		);

		return (
			<>
				<Head>
					<title>Analysis</title>
				</Head>
				<main class="analysis">
					<Container resourceActionsRecord={resourceActionsRecord} />
				</main>
			</>
		);
	},
);
