package dev.edu.analysis.adapters.validations;

import dev.edu.analysis.domain.clients.payloads.movement.query.MovementKpiQuery;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PeriodValidator implements ConstraintValidator<ValidDateTimePeriod, MovementKpiQuery> {
    @Override
    public boolean isValid(MovementKpiQuery query, ConstraintValidatorContext context) {
        if (query.startDate() == null || query.endDate() == null) {
            return true; // let @NotNull handle this
        }

        if (query.startDate().isAfter(query.endDate())) {
            return false;
        }

        // Optional: limit max range to 1 year
        if (query.startDate().plusYears(1).isBefore(query.endDate())) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                "Period cannot exceed 1 year"
            ).addConstraintViolation();
            return false;
        }

        return true;
    }
}