package dev.edu.analysis.application.errors;

public class OperationalKPIAggregationException extends RuntimeException {
    public OperationalKPIAggregationException(int statusCode) {
        super("Cannot aggregate operational KPI with status code: " + statusCode);
    }
}
