package dev.edu.analysis.application.results;

import java.util.Map;

import dev.edu.analysis.domain.values.GroupBy;

public record CapitalDistributionResult(
    GroupBy groupBy,
    Map<String, Long> distributions
) {}
