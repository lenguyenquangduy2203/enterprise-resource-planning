package dev.edu.analysis.application.errors;

public class EmptyAggregationException extends RuntimeException {
    public EmptyAggregationException(int statusCode) {
        super("Received aggregation is empty with status code: " + statusCode);
    }
}
