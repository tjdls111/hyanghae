/**
 *
 * Clothes
 * Clothes Entity
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-14
 * 마지막 수정일 2022-03-14
 **/
package com.idle.db.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "style")
@NoArgsConstructor
public class Style {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto increment
    @Column(name = "st_id")
    Long styleId;

    @Column(name="tpo", nullable = false)
    int tpo;

    @Column(name="mood", nullable = false)
    int mood;

    @OneToMany(mappedBy = "style", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonBackReference
    Set<Survey3> survey3List = new HashSet<>();
}
