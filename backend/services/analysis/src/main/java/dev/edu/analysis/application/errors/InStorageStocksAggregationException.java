package dev.edu.analysis.application.errors;

public class InStorageStocksAggregationException extends RuntimeException {
    public InStorageStocksAggregationException(int statusCode) {
        super("Cannot aggregate in storage stocks with status code: " + statusCode);
    }
}
