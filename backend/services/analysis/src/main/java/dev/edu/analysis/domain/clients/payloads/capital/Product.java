package dev.edu.analysis.domain.clients.payloads.capital;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record Product(
    @NotNull @Positive Long id,
    @NotNull @NotBlank String sku,
    @NotNull @Positive BigDecimal unitPrice,
    @NotNull @NotBlank String categoryCode
) {}
