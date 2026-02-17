package dev.edu.catalog.domain.errors;

public class RegisterWithInactivatedManufacturer extends RuntimeException {
    public RegisterWithInactivatedManufacturer(String code) {
        super("Inactivated manufacturer with code " + code + " is not allowed to be registered with");
    }
}
