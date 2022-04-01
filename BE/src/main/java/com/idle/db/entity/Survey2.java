/**
 *
 * Survey2 설문조사2
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-14
 * 마지막 수정일 2022-03-14
 **/
package com.idle.db.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "survey2")
@Getter
@Setter
@NoArgsConstructor
public class Survey2 extends BaseTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "s_id")
    Long surveyId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonBackReference
    @JoinColumn(name = "u_seq", nullable = false)
    User user;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JsonIgnore
    @JoinColumn(name = "p_id", nullable = false)
    Perfume perfume;

    @Column(name = "s_title", nullable = false)
    String surveyTitle;

    @Builder
    public Survey2(User user, Perfume perfume, String surveyTitle){
        this.user = user;
        this.perfume = perfume;
        this.surveyTitle = surveyTitle;
    }
}
