package dev.edu.auth.domain.models;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class PrincipalCounterId {
    @Column(name = "department_code", length = 50)
    private String departmentCode;

    @Column(name = "position_code", length = 50)
    private String positionCode;
}
