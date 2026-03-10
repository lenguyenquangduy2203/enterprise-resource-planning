package dev.edu.analysis.domain.clients.payloads.workforce;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record LevelCount(
    @NotNull @NotBlank String level,
    @NotNull @Positive Long total
) {}
