package dev.edu.hr.adapters.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record CreateEmployeeRequest(
    @NotBlank String fullname,
    @NotBlank @Email String email,
    String level,
    @Positive Long positionId
) {}
