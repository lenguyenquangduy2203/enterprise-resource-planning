package dev.edu.inventory.domain.values;

public enum MovementStatus {
    CREATED, INVALID, PENDING,
    
    IN_REVIEW, REJECTED, ACCEPTED,
    
    EXECUTING, FAILED, COMPLETED,
    
    CANCELLED
}
