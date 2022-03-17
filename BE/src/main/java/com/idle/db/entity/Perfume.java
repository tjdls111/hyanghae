/**
 *
 * Perfume
 * Perfume Entity
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
import java.time.LocalDateTime;
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

    @Column(name = "p_score", nullable = false)
    float perfumeScore;

    @Column(name = "p_cost", nullable = false)
    int perfumeCost;

    @Column(name = "p_brand", nullable = false)
    String perfumeBrand;

    @Column(name = "p_url", nullable = false)
    String perfumeUrl;

    @Column(name="p_date", nullable = false)
    LocalDateTime perfumeDate;

    @Column(name="gender", nullable = false)
    int gender;

    @Column(name="daynight", nullable = false)
    boolean daynight;

    @Column(name="season", nullable = false)
    int season;

    @Column(name="tpo", nullable = false)
    int tpo;

    @Column(name="mood", nullable = false)
    int mood;

    @OneToMany(mappedBy = "perfume", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    Set<Survey2> Survey2List = new HashSet<>();

    @OneToMany(mappedBy = "perfume", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    Set<Review> reviewList = new HashSet<>();

    @OneToMany(mappedBy = "perfume", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    Set<LikePerfume> likePerfumeList = new HashSet<>();

}

