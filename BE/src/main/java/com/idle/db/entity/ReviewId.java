/**
 *
 * ReviewId
 * Review,LikePerfume에 사용되는 복합키
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-15
 * 마지막 수정일 2022-03-15
 **/
package com.idle.db.entity;


import java.io.Serializable;
import java.util.Objects;

public class ReviewId implements Serializable {
    private Long user;
    private Long perfume;

    public ReviewId(){

    }
    public ReviewId(Long user, Long perfume){
        this.user = user;
        this.perfume = perfume;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ReviewId reviewId = (ReviewId) o;
        return Objects.equals(user, reviewId.user) && Objects.equals(perfume, reviewId.perfume);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, perfume);
    }
}
