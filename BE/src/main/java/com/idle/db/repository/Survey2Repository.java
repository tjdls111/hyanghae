/**
 *
 * Survey2Repository
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-14
 * 마지막 수정일 2022-03-14
 **/
package com.idle.db.repository;



import com.idle.db.entity.Survey2;
import com.idle.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface Survey2Repository extends JpaRepository<Survey2, Long> {
    Optional<Survey2> getSurvey2ByUserAndSurveyId(User user, Long surveyId);
    Long countByUser(User user);
    Survey2 findTop1ByUserOrderByCreateDateAsc(User user);
}
