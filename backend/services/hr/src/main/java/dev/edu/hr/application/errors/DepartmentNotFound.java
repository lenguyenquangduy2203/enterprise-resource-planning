package dev.edu.hr.application.errors;

public class DepartmentNotFound extends RuntimeException {
    public DepartmentNotFound(String departmentCode) {
        super("department with code " + departmentCode + " is not found");
    }
}
