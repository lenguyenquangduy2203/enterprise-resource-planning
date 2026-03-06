import { define, groupByResource } from "@/utils/mod.ts";
import { Head } from "fresh/runtime";
import { HomeController } from "@/controllers/inv/HomeController.ts";
import {
	PoliciesClient,
	PoliciesSchema,
} from "@/http-clients/auth/PoliciesClient.ts";
import { PageProps } from "fresh";
import z from "zod";
import Container from "@/islands/inv/Container.tsx";

export const handler = define.handlers({
	GET: HomeController(async (accessToken) => {
		const policies = await PoliciesClient.getJwtPolicies(accessToken);

		return { data: policies };
	}),
});

export default define.page(
	({ data }: PageProps<z.infer<typeof PoliciesSchema>>) => {
		const resourceActionsRecord = groupByResource(
			"inventory",
			data.permissions,
		);

		return (
			<>
				<Head>
					<title>Inventory</title>
				</Head>
				<main class="inv">
					<Container
						title="Inventory"
						resourceActionsRecord={resourceActionsRecord}
					/>
				</main>
			</>
		);
	},
);
