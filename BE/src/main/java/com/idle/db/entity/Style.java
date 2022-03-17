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


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "clothes")
@NoArgsConstructor
public class Clothes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto increment
    @Column(name = "c_id")
    Long clothesId;

    @Column(name = "c_type")
    String clothesType;

    @Column(name = "c_url")
    String clothesUrl;

    @Column(name="gender", nullable = false)
    int gender;

    @Column(name="age", nullable = false)
    int age;

    @Column(name="season", nullable = false)
    int season;

    @Column(name="tpo", nullable = false)
    int tpo;

    @Column(name="mood", nullable = false)
    int mood;

    @OneToMany(mappedBy = "clothes", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    Set<Survey3> Survey3List = new HashSet<>();
}
