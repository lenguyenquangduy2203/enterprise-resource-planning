package dev.edu.analysis.application.errors;

public class ProductCapitalSnapshotsAggregationException extends RuntimeException {
    public ProductCapitalSnapshotsAggregationException(int statusCode) {
        super("Cannot aggregate product capital snapshots with status code: " + statusCode);
    }
}
