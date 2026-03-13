package dev.edu.analysis.adapters.validations;

import dev.edu.analysis.domain.clients.payloads.movement.query.MovementKpiQuery;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PeriodValidator implements ConstraintValidator<ValidDateTimePeriod, MovementKpiQuery> {
    @Override
    public boolean isValid(MovementKpiQuery query, ConstraintValidatorContext context) {
        if (query.createdFrom() == null || query.createdTo() == null) {
            return true; // let @NotNull handle this
        }

        if (query.createdFrom().isAfter(query.createdTo())) {
            return false;
        }

        // Optional: limit max range to 1 year
        if (query.createdFrom().plusYears(1).isBefore(query.createdTo())) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                "Period cannot exceed 1 year"
            ).addConstraintViolation();
            return false;
        }

        return true;
    }
}