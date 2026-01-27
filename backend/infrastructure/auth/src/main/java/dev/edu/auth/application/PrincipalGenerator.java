package dev.edu.auth.application;

import dev.edu.auth.domain.values.GeneratedPrincipal;

public interface PrincipalGenerator {
    GeneratedPrincipal generate(String departmentCode, String positionCode);
}
