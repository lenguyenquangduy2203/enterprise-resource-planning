import ActionsContainerFactory from "@/islands/factories/ActionsContainerFactory.tsx";
import StockMovementRead from "./StockMovementRead.tsx";
import StockMovementWrite from "./StockMovementWrite.tsx";

type Action = "read" | "write";

const StockMovementActionsContainer = ActionsContainerFactory<Action>({
	read: () => <StockMovementRead />,
	write: () => <StockMovementWrite />,
});
export default StockMovementActionsContainer;
