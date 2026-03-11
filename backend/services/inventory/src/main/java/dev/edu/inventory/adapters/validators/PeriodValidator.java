package dev.edu.inventory.adapters.validators;

import dev.edu.inventory.adapters.payloads.kpi.OperationalKPISearchParams;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PeriodValidator implements ConstraintValidator<ValidDateTimePeriod, OperationalKPISearchParams> {
    @Override
    public boolean isValid(OperationalKPISearchParams query, ConstraintValidatorContext context) {
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