package dev.edu.hr.domain.entities.persistence;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "employee")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Employee {
    @Id
    @Column(name = "id", columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(name = "fullname", nullable = false, length = 150)
    private String fullname;

    @Column(name = "email", nullable = false, unique = true, length = 150)
    private String email;

    @Column(name = "level", length = 50)
    private String level;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "position_id", nullable = false)
    private Position position;

    @Column(name = "account_id", unique = true)
    private Long accountId;

    public static Employee onboard(String fullname, String email, String level, Position position) {
        if (position == null) {
            throw new IllegalArgumentException("Position must be provided");
        }
    
        var employee = new Employee();
        employee.fullname = fullname;
        employee.email = email;
        employee.level = level;
        employee.position = position;

        return employee;
    }

    public boolean hasAccount() {
        return accountId != null;
    }

    public void linkAccount(Long accountId) {
        if (this.accountId != null) {
            throw new IllegalStateException("Employee already has an account");
        }
        
        this.accountId = accountId;
    }

    public void changePosition(Position newPosition) {
        this.position = newPosition;
    }
}
