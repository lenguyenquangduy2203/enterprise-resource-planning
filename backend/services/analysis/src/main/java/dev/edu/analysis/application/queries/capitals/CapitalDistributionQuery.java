package dev.edu.analysis.application.queries.capitals;

import dev.edu.analysis.application.contracts.Query;
import dev.edu.analysis.application.results.CapitalDistributionResult;
import dev.edu.analysis.application.services.CapitalDistributionQueryHandler;
import dev.edu.analysis.domain.values.GroupBy;

public sealed interface CapitalDistributionQuery extends Query<CapitalDistributionQueryHandler, CapitalDistributionResult>
    permits CapitalByCategory,
            CapitalByWarehouse {
    GroupBy groupBy();
}
