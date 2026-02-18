package dev.edu.inventory.adapters.validators;

import dev.edu.inventory.adapters.payloads.StockMovementSearchParams;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class DateRangeValidator implements ConstraintValidator<ValidDateRange, StockMovementSearchParams> {
    @Override
    public boolean isValid(StockMovementSearchParams params, ConstraintValidatorContext context) {
        if (params.createdFrom() == null || params.createdTo() == null) {
            return true; // valid if one is null
        }

        return !params.createdFrom().isAfter(params.createdTo());
    }
}
