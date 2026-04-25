package dev.edu.hr.adapters.payloads;

public record PerformerLookupsParams(
    String departmentCode,
    String positionCode,
    String matchName // employee's fullname contains match name
) {}
