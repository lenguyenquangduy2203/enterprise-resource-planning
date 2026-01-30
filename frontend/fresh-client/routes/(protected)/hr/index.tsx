import { define, groupByResource } from "@/utils/mod.ts";
import { Head } from "fresh/runtime";
import ModuleContainer from "@/islands/ModuleContainer.tsx";
import { HomeController } from "@/controllers/hr/HomeController.ts";
import {
	PoliciesClient,
	PoliciesSchema,
} from "@/http-clients/auth/PoliciesClient.ts";
import { PageProps } from "fresh";
import z from "zod";

export const handler = define.handlers({
	GET: HomeController(async (accessToken) => {
		const policies = await PoliciesClient.getJwtPolicies(accessToken);

		return { data: policies };
	}),
});

export default define.page(
	({ data }: PageProps<z.infer<typeof PoliciesSchema>>) => {
		const resourceActionsRecord = groupByResource("hr", data.permissions);

		return (
			<>
				<Head>
					<title>Human Resource</title>
				</Head>
				<main>
					<ModuleContainer
						moduleName="Human Resources"
						resourceActionsRecord={resourceActionsRecord}
					/>
				</main>
			</>
		);
	},
);
