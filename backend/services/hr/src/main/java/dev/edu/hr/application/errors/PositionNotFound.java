package dev.edu.hr.application.errors;

public class PositionNotFound extends RuntimeException {
    public PositionNotFound(String positionCode) {
        super("Position with code " + positionCode + " is not found");
    }
}
