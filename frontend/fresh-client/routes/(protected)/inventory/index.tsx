import { define, groupByResource } from "@/utils/mod.ts";
import { Head } from "fresh/runtime";
import { HomeController } from "@/controllers/inv/HomeController.ts";
import {
	PoliciesClient,
	PoliciesSchema,
} from "@/http-clients/auth/PoliciesClient.ts";
import { PageProps } from "fresh";
import ModuleContainer from "@/islands/ModuleContainer.tsx";
import z from "zod";

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
				<main>
					<ModuleContainer
						moduleName="Inventory Management"
						resourceActionsRecord={resourceActionsRecord}
					/>
				</main>
			</>
		);
	},
);
