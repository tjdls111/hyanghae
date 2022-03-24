/**
 *
 * Perfume
 * Perfume Entity
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-14
 * 마지막 수정일 2022-03-23
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
@Table(name = "perfume")
@NoArgsConstructor
public class Perfume  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto increment
    @Column(name = "p_id")
    Long perfumeId;

    @Column(name = "p_name", nullable = false)
    String perfumeName;

    @Column(name = "p_brand", nullable = false)
    String perfumeBrand;

    @Column(name = "p_score", nullable = false)
    float perfumeScore;

    @Column(name = "p_group", nullable = false)
    String group;

    @Column(name = "note1", nullable = false)
    String note1;

    @Column(name = "note2", nullable = false)
    String note2;

    @Column(name = "note3", nullable = false)
    String note3;

    @Column(name="time", nullable = false)
    int time;

    @Column(name="gender", nullable = false)
    int gender;

    @Column(name="season", nullable = false)
    int season;

    @Column(name="tpo", nullable = false)
    int tpo;

    @Column(name="mood", nullable = false)
    int mood;

    @OneToMany(mappedBy = "perfume", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonBackReference
    Set<Survey2> survey2List = new HashSet<>();

    @OneToMany(mappedBy = "perfume", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonBackReference
    Set<Review> reviewList = new HashSet<>();

    @OneToMany(mappedBy = "perfume", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonBackReference
    Set<LikePerfume> likePerfumeList = new HashSet<>();

}

