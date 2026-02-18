package dev.edu.inventory.adapters.payloads;

import java.time.Instant;
import java.util.UUID;

import org.springframework.format.annotation.DateTimeFormat;

import dev.edu.inventory.adapters.validators.ValidDateRange;
import dev.edu.inventory.domain.values.MovementStatus;
import dev.edu.inventory.domain.values.MovementType;
import jakarta.validation.constraints.Size;

@ValidDateRange
public record StockMovementSearchParams(
    @Size(max = 50, message = "Product SKU must not exceed 50 characters")
    String productSku,
    MovementType movementType,
    MovementStatus status,
    Long fromWarehouseId,
    Long toWarehouseId,
    UUID performedBy,
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    Instant createdFrom,
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    Instant createdTo
) {}
