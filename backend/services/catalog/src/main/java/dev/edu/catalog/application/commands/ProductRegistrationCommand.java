package dev.edu.catalog.application.commands;

import java.math.BigDecimal;

import dev.edu.catalog.application.contracts.Command;
import dev.edu.catalog.application.services.ProductRegistrationCommandHandler;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ProductRegistrationCommand(
    @NotBlank @Size(max = 50) String sku,
    @NotBlank @Size(max = 150) String name,
    @Size(max = 50) String unit,
    @NotNull @DecimalMin(value = "0.01", inclusive = true) BigDecimal unitPrice,
    @Size(max = 255) String description,
    @NotBlank @Size(max = 50) String categoryCode,
    @NotBlank @Size(max = 50) String manufacturerCode
) implements Command<ProductRegistrationCommandHandler> {
    @Override
    public void accept(ProductRegistrationCommandHandler handler) {
        handler.handle(this);
    }
}
