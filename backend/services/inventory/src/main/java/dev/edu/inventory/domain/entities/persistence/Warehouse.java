package dev.edu.inventory.domain.entities.persistence;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "warehouse")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Warehouse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code", nullable = false, unique = true, length = 50)
    private String code;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 150)
    private String location;

    @Column(length = 50)
    private String size;

    @Column(length = 255)
    private String description;

    // Logical FK to hr.employee(id)
    @Column(name = "manager_id", nullable = false, unique = true, columnDefinition = "BINARY(16)")
    private UUID managerId;
}
