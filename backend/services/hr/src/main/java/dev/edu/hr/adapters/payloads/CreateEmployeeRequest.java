package dev.edu.hr.adapters.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record CreateEmployeeRequest(
    @NotBlank String fullname,
    @NotBlank @Email String email,
    String level,
    @NotBlank String departmentCode,
    @NotBlank String positionCode
) {}
