package dev.edu.analysis.domain.clients.payloads.capital;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record Stock(
    @NotNull @Positive Long id,
    @NotNull @Positive Long productId,
    @NotNull @Positive Integer quantity,
    @NotNull @NotBlank String warehouseCode
) {}
