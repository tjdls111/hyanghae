/**
 *
 * Survey3Repository
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-14
 * 마지막 수정일 2022-03-14
 **/
package com.idle.db.repository;


import com.idle.db.entity.Survey3;
import com.idle.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface Survey3Repository extends JpaRepository<Survey3, Long> {
    Optional<Survey3>  getSurvey3ByUserAndSurveyId(User user, Long surveyId);
    Long countByUser(User user);
    Survey3 findTop1ByUserOrderByCreateDateAsc(User user);
}
