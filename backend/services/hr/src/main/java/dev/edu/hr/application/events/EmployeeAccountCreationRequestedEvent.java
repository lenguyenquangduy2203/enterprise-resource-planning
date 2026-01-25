package dev.edu.hr.application.events;

import java.util.UUID;

import dev.edu.hr.domain.clients.payloads.DepartmentCode;
import dev.edu.hr.domain.clients.payloads.PositionCode;

public record EmployeeAccountCreationRequestedEvent(
    UUID employeeId,
    DepartmentCode department,
    PositionCode position
) {}
