package dev.edu.analysis.application.queries;

import dev.edu.analysis.application.contracts.Query;
import dev.edu.analysis.application.services.OrganizationStructureQueryHandler;
import dev.edu.analysis.domain.clients.payloads.workforce.Workforce;

public record OrganizationStructureQuery() implements Query<OrganizationStructureQueryHandler, Workforce> {
    @Override
    public Workforce accept(OrganizationStructureQueryHandler handler) {
        return handler.handle(this);
    }
}
