package dev.edu.hr.domain.clients.payloads;

import java.util.UUID;

public record CreateEmployeeAccountRequest(
    UUID employeeId,
    DepartmentCode department,
    PositionCode position
) {}
