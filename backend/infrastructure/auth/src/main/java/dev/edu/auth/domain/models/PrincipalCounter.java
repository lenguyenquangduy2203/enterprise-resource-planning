package dev.edu.auth.domain.models;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "principal_counter")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PrincipalCounter {
    @EmbeddedId
    private PrincipalCounterId id;

    @Column(name = "next_value", nullable = false)
    private Long nextValue;
}
