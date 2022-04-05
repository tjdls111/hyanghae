package com.idle.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "Brand")
@NoArgsConstructor
public class Brand {

    @Id
    @Column(name = "b_name")
    String brandName;

    @Column(name = "kor_name")
    String korName;

    @OneToMany(mappedBy = "perfumeBrand", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIgnore
    Set<Perfume> perfumeList = new HashSet<>();
}
