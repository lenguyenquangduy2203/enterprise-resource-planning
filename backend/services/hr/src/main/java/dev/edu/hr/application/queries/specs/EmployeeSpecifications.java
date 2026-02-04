package dev.edu.hr.application.queries.specs;

import org.springframework.data.jpa.domain.Specification;

import dev.edu.hr.application.queries.SearchEmployeeQuery;
import dev.edu.hr.domain.entities.persistence.Employee;
import dev.edu.hr.domain.values.AccountProvisioningStatus;
import jakarta.persistence.criteria.JoinType;

public final class EmployeeSpecifications {
    private static String positionAttr = "position";
    private static String departmentAttr = "department";

    private EmployeeSpecifications() {}

    // ==SPECS FACTORIES==
    public static Specification<Employee> from(SearchEmployeeQuery query) {
        return Specification
            .where(fetchPositionAndDepartment())
            .and(hasDepartment(query.departmentCode()))
            .and(hasPosition(query.positionCode()))
            .and(hasLevel(query.level()))
            .and(hasAccountStatus(query.accountProvisioningStatus()))
            .and(hasFullname(query.fullname()))
            .and(hasEmail(query.email()));
    }

    // ==HELPERS METHODS==
    /**
     * Used to eagerly load position and department of an employee;
     * 
     * @return Specification<Employee>
     */
    private static Specification<Employee> fetchPositionAndDepartment() {
        return (root, query, cb) -> {
            // Only fetch for entity queries, not count queries
            if (query.getResultType() == Employee.class) {
                root.fetch("position", JoinType.INNER)
                    .fetch("department", JoinType.INNER);
                query.distinct(true);
            }

            return null;
        };
    }

    private static Specification<Employee> hasDepartment(String departmentCode) {
        return (root, query, cb) ->
            departmentCode == null ? null :
            cb.equal(
                root.join(positionAttr).join(departmentAttr).get("code"),
                departmentCode
            );
    }

    private static Specification<Employee> hasPosition(String positionCode) {
        return (root, query, cb) ->
            positionCode == null ? null :
            cb.equal(root.join(positionAttr).get("code"), positionCode);
    }

    private static Specification<Employee> hasLevel(String level) {
        return (root, query, cb) ->
            level == null ? null :
            cb.equal(root.get("level"), level);
    }

    private static Specification<Employee> hasAccountStatus(AccountProvisioningStatus status) {
        return (root, query, cb) -> {
            if (status == null) return null;
            return status == AccountProvisioningStatus.PROVISIONED
                ? cb.isNotNull(root.get("accountId"))
                : cb.isNull(root.get("accountId"));
        };
    }

    private static Specification<Employee> hasFullname(String fullname) {
        return (root, query, cb) ->
            fullname == null ? null :
            cb.like(cb.lower(root.get("fullname")), "%" + fullname.toLowerCase() + "%");
    }

    private static Specification<Employee> hasEmail(String email) {
        return (root, query, cb) ->
            email == null ? null :
            cb.like(cb.lower(root.get("email")), email.toLowerCase() + "%");
    }
}
