package dev.edu.inventory.application.commands.movement;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonSubTypes;

import dev.edu.inventory.application.contracts.Command;
import dev.edu.inventory.application.results.MovementRequestStatus;
import dev.edu.inventory.application.services.CreateStockMovementCommandHandler;

@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    include = JsonTypeInfo.As.PROPERTY,
    property = "type"
)
@JsonSubTypes({
    @JsonSubTypes.Type(value = TransferStockCommand.class, name = "TRANSFER"),
    @JsonSubTypes.Type(value = ImportStockCommand.class, name = "IMPORT"),
    @JsonSubTypes.Type(value = ExportStockCommand.class, name = "EXPORT"),
    @JsonSubTypes.Type(value = AdjustmentStockCommand.class, name = "ADJUSTMENT")
})
public sealed interface MovementRequest extends Command<CreateStockMovementCommandHandler, MovementRequestStatus> 
    permits TransferStockCommand,
            ImportStockCommand,
            ExportStockCommand,
            AdjustmentStockCommand {
    Long productId();
    Integer quantity();
}
