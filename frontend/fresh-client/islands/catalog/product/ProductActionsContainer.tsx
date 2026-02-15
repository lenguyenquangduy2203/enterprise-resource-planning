import ActionsContainerFactory from "@/islands/factories/ActionsContainerFactory.tsx";
import ProductRead from "./ProductRead.tsx";
import ProductWrite from "./ProductWrite.tsx";

type Action = "read" | "write";

const ProductActionsContainer = ActionsContainerFactory<Action>({
	read: () => <ProductRead />,
	write: () => <ProductWrite />,
});
export default ProductActionsContainer;
