/**
 *
 * LikePerfume
 * LikePerfume Entitiy
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-14
 * 마지막 수정일 2022-03-15
 **/
package com.idle.db.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@Table(name = "likeperfume")
@IdClass(ReviewId.class)
@NoArgsConstructor
public class LikePerfume implements Serializable {
    @Id
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name="u_seq")
    private User user;

    @Id
    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name="p_id")
    private Perfume perfume;

    @Builder
    public LikePerfume(User user, Perfume perfume){
        this.user = user;
        this.perfume = perfume;
    }

}
