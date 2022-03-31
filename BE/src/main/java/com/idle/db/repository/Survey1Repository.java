/**
 *
 * Survey1Repository
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-07
 * 마지막 수정일 2022-03-07
 **/
package com.idle.db.repository;


import com.idle.db.entity.Survey1;
import com.idle.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface Survey1Repository extends JpaRepository<Survey1, Long> {

    Optional<Survey1> getSurvey1ByUserAndSurveyId(User user, Long surveyId);
    Long countByUser(User user);
    Survey1 findTop1ByUserOrderByCreateDateAsc(User user);
}
