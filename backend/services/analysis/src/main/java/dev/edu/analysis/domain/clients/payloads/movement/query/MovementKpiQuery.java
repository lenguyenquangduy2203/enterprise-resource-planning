package dev.edu.analysis.domain.clients.payloads.movement.query;

import java.time.OffsetDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import dev.edu.analysis.adapters.validations.ValidDateTimePeriod;
import jakarta.validation.constraints.NotNull;

@ValidDateTimePeriod
public record MovementKpiQuery(
    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    OffsetDateTime createdFrom,
    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    OffsetDateTime createdTo
) {}