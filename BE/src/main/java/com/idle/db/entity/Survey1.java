/**
 *
 * Survey1 설문조사
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-07
 * 마지막 수정일 2022-03-23
 **/
package com.idle.db.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "survey1")
@Getter
@Setter
@NoArgsConstructor
public class Survey1 extends BaseTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "s_id")
    Long surveyId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonBackReference
    @JoinColumn(name = "u_seq", nullable = false)
    User user;

    @Column(name="gender", nullable = false)
    int gender;

    @Column(name="time", nullable = false)
    int time;

    @Column(name="season", nullable = false)
    int season;

    @Column(name="tpo", nullable = false)
    int tpo;

    @Column(name="mood", nullable = false)
    int mood;

    @Column(name="s_title", nullable = false)
    String surveyTitle;

    @Builder
    public Survey1(User user, int gender, int time, int season, int tpo, int mood, String surveyTitle){
        this.user = user;
        this.gender = gender;
        this.time = time;
        this.season = season;
        this.tpo = tpo;
        this.mood = mood;
        this.surveyTitle = surveyTitle;
    }

}
