package dev.edu.hr.adapters.mappers;

import java.util.List;

import org.springframework.data.domain.Page;

import dev.edu.hr.adapters.payloads.PerformerLookupsParams;
import dev.edu.hr.adapters.payloads.PerformerSelectOption;
import dev.edu.hr.application.queries.SearchEmployeeQuery;
import dev.edu.hr.domain.entities.persistence.Employee;

public interface PerformerLookupsMapper {
    SearchEmployeeQuery toSearchEmployeeQuery(PerformerLookupsParams params);
    List<PerformerSelectOption> toPerformerSelectOptions(Page<Employee> employees);
}
