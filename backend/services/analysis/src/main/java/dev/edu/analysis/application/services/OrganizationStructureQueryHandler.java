package dev.edu.analysis.application.services;

import dev.edu.analysis.application.queries.OrganizationStructureQuery;
import dev.edu.analysis.domain.clients.payloads.workforce.Workforce;

public interface OrganizationStructureQueryHandler {
    Workforce handle(OrganizationStructureQuery query);
}
