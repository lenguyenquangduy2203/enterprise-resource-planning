import ActionsContainerFactory from "@/islands/factories/ActionsContainerFactory.tsx";
import EmployeeWrite from "../employee/EmployeeWrite.tsx";
import EmployeeRead from "../employee/EmployeeRead.tsx";

type Action = "read" | "write";

const EmployeeActionsContainer = ActionsContainerFactory<Action>({
	read: () => <EmployeeRead />,
	write: () => <EmployeeWrite />,
});
export default EmployeeActionsContainer;
