package dev.edu.analysis.application.errors;

public class OrganizationStructureAggregationException extends RuntimeException {
    public OrganizationStructureAggregationException(int statusCode) {
        super("Cannot aggregate organization's structure with status code: " + statusCode);
    }
}
