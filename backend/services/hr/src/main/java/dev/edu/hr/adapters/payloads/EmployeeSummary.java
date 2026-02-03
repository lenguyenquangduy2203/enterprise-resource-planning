package dev.edu.hr.adapters.payloads;

import java.util.UUID;

public record EmployeeSummary(
    UUID id,
    String fullname,
    String email,
    String level,
    String positionCode,
    String positionName,
    String departmentCode,
    String departmentName,
    boolean hasAccount
) {}
