package dev.edu.inventory.application.errors;

public class PerformerNotAuthenticatedException extends RuntimeException {
    public PerformerNotAuthenticatedException() {
        super("No authenticated performer found in security context");
    }
}
