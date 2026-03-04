package dev.edu.analysis.application.services;

import dev.edu.analysis.application.queries.capitals.CapitalByCategory;
import dev.edu.analysis.application.queries.capitals.CapitalByWarehouse;
import dev.edu.analysis.application.results.CapitalDistributionResult;

public interface CapitalDistributionQueryHandler {
    CapitalDistributionResult handle(CapitalByWarehouse query);
    CapitalDistributionResult handle(CapitalByCategory query);
}
