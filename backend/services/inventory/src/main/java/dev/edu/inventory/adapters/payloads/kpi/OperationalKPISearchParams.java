package dev.edu.inventory.adapters.payloads.kpi;

import java.time.OffsetDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import dev.edu.inventory.adapters.validators.ValidDateTimePeriod;
import jakarta.validation.constraints.NotNull;

@ValidDateTimePeriod
public record OperationalKPISearchParams(
    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    OffsetDateTime createdFrom,
    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    OffsetDateTime createdTo
) {}
