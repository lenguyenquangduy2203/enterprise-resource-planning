package dev.edu.analysis.domain.clients.payloads.movement;

public enum MovementStatus {
    PENDING,
    IN_REVIEW, 
    REJECTED, 
    ACCEPTED,
    EXECUTING, 
    FAILED, 
    COMPLETED,
    CANCELLED
}
