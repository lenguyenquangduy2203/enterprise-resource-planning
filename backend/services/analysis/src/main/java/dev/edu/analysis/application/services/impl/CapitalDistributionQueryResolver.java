package dev.edu.analysis.application.services.impl;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import dev.edu.analysis.application.queries.capitals.CapitalDistributionQuery;
import dev.edu.analysis.domain.values.GroupBy;

@Component
public class CapitalDistributionQueryResolver {
    private final Map<GroupBy, CapitalDistributionQuery> strategies;

    public CapitalDistributionQueryResolver(List<CapitalDistributionQuery> implementations) {
        this.strategies = implementations.stream()
            .collect(Collectors.toMap(
                CapitalDistributionQuery::groupBy, 
                Function.identity()
            ));
    }

    public CapitalDistributionQuery resolve(GroupBy groupBy) {
        return Optional.ofNullable(strategies.get(groupBy))
            .orElseThrow(() -> new IllegalStateException("Unsupported group: " + groupBy));
    }
}
