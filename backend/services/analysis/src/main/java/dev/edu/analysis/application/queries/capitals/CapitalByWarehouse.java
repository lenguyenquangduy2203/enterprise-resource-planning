package dev.edu.analysis.application.queries.capitals;

import dev.edu.analysis.application.results.CapitalDistributionResult;
import dev.edu.analysis.application.services.CapitalDistributionQueryHandler;
import dev.edu.analysis.domain.values.GroupBy;

public final record CapitalByWarehouse() implements CapitalDistributionQuery {
    @Override
    public CapitalDistributionResult accept(CapitalDistributionQueryHandler handler) {
        return handler.handle(this);
    }

    @Override
    public GroupBy groupBy() {
        return GroupBy.WAREHOUSE;
    }
}
