/**
* PerfumeServiceImpl
* 향수 검색, 향수 조회 기능 구현
*
* @author Woody
* @version 1.0.0
* 생성일 2022/03/16
* 마지막 수정일 2022/03/25
**/
package com.idle.api.service;

import com.google.common.collect.Lists;
import com.idle.api.request.ReviewInsertRequest;
import com.idle.db.entity.*;
import com.idle.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;


@Service("perfumeService")
public class PerfumeServiceImpl implements PerfumeService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    PerfumeRepository perfumeRepository;

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    LikePerfumeRepository likePerfumeRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Override
    public Page<Perfume> getPerfumeSearchPage(String keyword, String content, Pageable pageable) {
        Page<Perfume> page = null;
        if(keyword.equals("perfumeName")){
            page = perfumeRepository.findByPerfumeNameContaining(content, pageable);

        } else if(keyword.equals("brand")) {
            page = perfumeRepository.findByPerfumeBrandContaining(content, pageable);

        }
        return page;
    }

    /* David : 향수 목록 조회 */
    @Override
    public Page<Perfume> getPerfumeList(Pageable pageable) {
        Page<Perfume> perfumes = perfumeRepository.findAll(pageable);
        return perfumes;
    }

    /* Woody */
    @Override
    public Perfume getPerfumeByPerfumeId(Long perfumeId) {
        Perfume perfume = perfumeRepository.findByPerfumeId(perfumeId).orElse(null);
        return perfume;
    }

    /* David : 향수 브랜드 목록 조회 */
    @Override
    public List<Brand> getBrandList() {
        List<Brand> brandList = brandRepository.findAll();
        return brandList;
    }

    /* David : 향수 리뷰 작성 */
    @Override
    public String insertReview(User user, ReviewInsertRequest reviewInsertRequest) {
        Optional<Perfume> checkPerfume = perfumeRepository.findByPerfumeId(reviewInsertRequest.getPerfumeId());
        Optional<Review> checkReview = reviewRepository.findByUserAndPerfume(user, checkPerfume.get());
        if (!checkPerfume.isPresent() || checkReview.isPresent()) {
            return "fail";
        } else {
            Review review = Review.builder()
                    .user(user)
                    .perfume(checkPerfume.get())
                    .reviewContent(reviewInsertRequest.getReviewContent())
                    .reviewScore(reviewInsertRequest.getReviewScore())
                    .build();
            reviewRepository.save(review); // 리뷰 저장

            float avg = reviewRepository.findAvgWithJPQL(reviewInsertRequest.getPerfumeId()); // 리뷰 평점 평균값
            checkPerfume.get().setPerfumeScore(avg);
            int reviewCnt = reviewRepository.countByPerfume(checkPerfume.get()); //리뷰 개수
            checkPerfume.get().setReviewCnt(reviewCnt);
            perfumeRepository.save(checkPerfume.get()); // 향수 정보 업데이트

            return "success";
        }

    }

    /* David : 향수 리뷰 목록 조회 */
    @Override
    public Page<Review> getReviewList(Pageable pageable,Long perfumeId) {
        Perfume perfume = perfumeRepository.findByPerfumeId(perfumeId).get();
        Page<Review> reviews = reviewRepository.findByPerfume(pageable, perfume);
        return reviews;
    }

    /* David : 향수 리뷰 수정 */
    @Override
    public String updateReview(User user, ReviewInsertRequest reviewInsertRequest) {
        Optional<Perfume> checkPerfume = perfumeRepository.findByPerfumeId(reviewInsertRequest.getPerfumeId());
        Optional<Review> checkReview = reviewRepository.findByUserAndPerfume(user, checkPerfume.get());
        if (!checkPerfume.isPresent() || !checkReview.isPresent()) {
            return "fail";
        } else {
            checkReview.get().setReviewScore(reviewInsertRequest.getReviewScore());
            checkReview.get().setReviewContent(reviewInsertRequest.getReviewContent());
            reviewRepository.save(checkReview.get()); // 리뷰 저장

            float avg = reviewRepository.findAvgWithJPQL(reviewInsertRequest.getPerfumeId()); // 리뷰 평점 평균값
            checkPerfume.get().setPerfumeScore(avg);
            int reviewCnt = reviewRepository.countByPerfume(checkPerfume.get()); //리뷰 개수
            checkPerfume.get().setReviewCnt(reviewCnt);
            perfumeRepository.save(checkPerfume.get()); // 향수 정보 업데이트
            return "success";
        }
    }

    /* David : 향수 리뷰 삭제 */
    @Override
    public String deleteReview(User user, Long perfumeId) {
        Optional<Perfume> checkPerfume = perfumeRepository.findByPerfumeId(perfumeId);
        Optional<Review> checkReview = reviewRepository.findByUserAndPerfume(user, checkPerfume.get());
        if (!checkPerfume.isPresent() || !checkReview.isPresent()) {
            return "fail";
        }else{
            reviewRepository.delete(checkReview.get());
            float r = reviewRepository.findAvgWithJPQL(checkPerfume.get().getPerfumeId());
            checkPerfume.get().setPerfumeScore(r);
            perfumeRepository.save(checkPerfume.get());
            return "success";
        }

    }

    /* David : 향수 좋아요 등록/해제 */
    @Override
    public String likePerfume(User user, Long perfumeId) {
        Optional<Perfume> checkPerfume = perfumeRepository.findByPerfumeId(perfumeId);
        if(!checkPerfume.isPresent()){
            return "fail";
        }
        Optional<LikePerfume> checkLikePerfume  = likePerfumeRepository.findByUserAndPerfume(user, checkPerfume.get());
        if(checkLikePerfume.isPresent()){
            likePerfumeRepository.delete(checkLikePerfume.get());
            int likeCnt = likePerfumeRepository.countByPerfume(checkPerfume.get()); // 좋아요 개수
            checkPerfume.get().setLikeCnt(likeCnt);
            perfumeRepository.save(checkPerfume.get()); // 향수 정보 업데이트

            return "clear";
        }
        LikePerfume likePerfume = new LikePerfume(user,checkPerfume.get());
        likePerfumeRepository.save(likePerfume);
        int likeCnt = likePerfumeRepository.countByPerfume(checkPerfume.get()); // 좋아요 개수
        checkPerfume.get().setLikeCnt(likeCnt);
        perfumeRepository.save(checkPerfume.get()); // 향수 정보 업데이트
        return "register";
    }

    /* David : 향수 좋아요 목록 조회 */
    @Override
    public Page<LikePerfume> getLikePerfumeList(User user, Pageable pageable) {
        Page<LikePerfume> likePerfumes = likePerfumeRepository.findByUser(user, pageable);
        return likePerfumes;
    }

    /* David : 향수 추천 결과 목록 조회 (설문조사1, 2, 3의 결과) */
    @Override
    public Map<String, List<Perfume>> getRecommendPerfumeList(User user) {

        User targetUser = userRepository.findByUserId(user.getUserId()).get();
        //유저의 설문조사 1,2,3 리스트
        List<Survey1> list1 = new ArrayList<Survey1>(targetUser.getSurvey1List());
        List<Survey2> list2 = new ArrayList<Survey2>(targetUser.getSurvey2List());
        List<Survey3> list3 = new ArrayList<Survey3>(targetUser.getSurvey3List());
        //확인
        System.out.println("설문조사1-1 상태값 : "+list1.get(0).getGender()+","+list1.get(0).getTime()+","+list1.get(0).getSeason()+","+list1.get(0).getTpo()+","+list1.get(0).getMood());


        //여기서 설문조사의 상태값을 전달하고 그에 따른 결과 값을 받아야함 지금은 더미데이터(설문조사1보다 mood가 높은 향수 리스트)
        List<Perfume> recommendPerfumeList1 = perfumeRepository.findByMoodGreaterThan(list1.get(0).getMood());
        List<Perfume> recommendPerfumeList2 = perfumeRepository.findByMoodGreaterThan(list1.get(0).getMood());
        List<Perfume> recommendPerfumeList3 = perfumeRepository.findByMoodGreaterThan(list1.get(0).getMood());

        //추천결과 리스트 리턴
        Map<String,List<Perfume>> map = new HashMap<>();
        map.put("recommendPerfumeList1",recommendPerfumeList1);
        map.put("recommendPerfumeList2",recommendPerfumeList2);
        map.put("recommendPerfumeList3",recommendPerfumeList3);

        return map;
    }

}
