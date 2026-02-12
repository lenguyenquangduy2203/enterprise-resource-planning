package dev.edu.catalog.domain.errors;

public class RegisterWithInactivatedCategory extends RuntimeException {
    public RegisterWithInactivatedCategory(String code) {
        super("Inactivated category with code " + code + " is not allowed to be registered with");
    }
}
