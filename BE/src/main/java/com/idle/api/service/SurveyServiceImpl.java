/**
 * SurveyServiceImpl
 *
 * @author David, Alice
 * @version 1.0.0
 * 생성일 2022-03-29
 * 마지막 수정일 2022-03-31
 **/

package com.idle.api.service;

import com.idle.api.request.Survey1InsertRequest;
import com.idle.api.request.Survey2InsertRequest;
import com.idle.api.request.Survey3InsertRequest;
import com.idle.common.perfume.KmeansAlgorithm;
import com.idle.db.entity.*;
import com.idle.db.repository.*;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.*;

@Service("surveyService")
public class SurveyServiceImpl implements SurveyService {

    @Autowired
    Survey1Repository survey1Repository;
    @Autowired
    Survey2Repository survey2Repository;
    @Autowired
    Survey3Repository survey3Repository;
    @Autowired
    PerfumeRepository perfumeRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    StyleRepository styleRepository;
    @Autowired
    ResourceLoader resourceLoader;

    @Override
    public Map<String, List<?>> getSurveyList(User user) {
        User targetUser = userRepository.findByUserId(user.getUserId()).get();
        //유저의 설문조사 1,2,3 리스트
        List<Survey1> survey1List = new ArrayList<Survey1>(targetUser.getSurvey1List());
        List<Survey2> survey2List = new ArrayList<Survey2>(targetUser.getSurvey2List());
        List<Survey3> survey3List = new ArrayList<Survey3>(targetUser.getSurvey3List());

        //추천결과 리스트 리턴
        Map<String, List<?>> map = new HashMap<>();
        map.put("survey1List", Collections.singletonList(survey1List));
        map.put("survey2List", Collections.singletonList(survey2List));
        map.put("survey3List", Collections.singletonList(survey3List));

        return map;

    }

    /* David : 설문조사1 조회 */
    @Override
    public Survey1 getSurvey1ByUserAndSurveyId(User user, Long surveyId) {
        Optional<Survey1> survey1 = survey1Repository.getSurvey1ByUserAndSurveyId(user, surveyId);
        return survey1.get();
    }

    /* David : 설문조사1 저장 */
    @Override
    public List<Perfume> insertSurvey1(User user, Survey1InsertRequest req) throws IOException {
        Long count = survey1Repository.countByUser(user);
        if (count >= 3) {
            Survey1 orderSurvey1 = survey1Repository.findTop1ByUserOrderByCreateDateAsc(user);
            survey1Repository.delete(orderSurvey1);
        }

        Survey1 survey1 = Survey1.builder()
                .user(user)
                .surveyTitle(req.getSurveyTitle())
                .gender(req.getGender())
                .time(req.getTime())
                .season(req.getSeason())
                .tpo(req.getTpo())
                .mood(req.getMood())
                .build();

        survey1Repository.save(survey1);

        //향수 추천
        List<Perfume> recommendList = recommendPerfumeBySurvey1(survey1);

        return recommendList;
    }

    /* David, Alice : 설문조사1 기반 향수 추천 */
    @Override
    public List<Perfume> recommendPerfumeBySurvey1(Survey1 survey1) throws IOException {

        ArrayList<ArrayList<Double>> dataSet = new ArrayList<ArrayList<Double>>();

        // 데이터셋 추가
//        String filePath = "src/main/resources/perfume/perfumes.xlsx";
//        File xlsx = new File(filePath);
//        XSSFWorkbook wb = new XSSFWorkbook(new FileInputStream(xlsx));

        ClassPathResource classPathResource = new ClassPathResource("perfume/perfumes.xlsx");
        if(classPathResource.exists() == false){
            System.out.println("이거 안되면 나도 몰라");
            throw new IllegalArgumentException();
        }
        XSSFWorkbook wb = new XSSFWorkbook(classPathResource.getInputStream());

        // 엑셀파일 전체 내용을 담고 있는 객체
        XSSFSheet sheet = wb.getSheetAt(0);
        XSSFRow row = null;
        XSSFCell cell = null;

        // 탐색에 사용할 sheet 객체
        for (int i = 1; i < sheet.getLastRowNum(); i++) {
            row = sheet.getRow(i);
            ArrayList<Double> cluster = new ArrayList<Double>();
            for (int j = 0; j < 5; j++) {
                cell = row.getCell(j);
                switch (cell.getCellType()) {
                    case Cell.CELL_TYPE_STRING:
                        cluster.add(Double.valueOf(cell.getStringCellValue()));
                        break;
                    case Cell.CELL_TYPE_NUMERIC:
                        cluster.add(cell.getNumericCellValue());
                        break;
                }
            }

            dataSet.add(cluster);   // 데이터셋 list에 데이터(Season, Time, Gender, TPO, Mood) 추가
        }

        // 설문조사 데이터를 dataSet 리스트에 추가
        ArrayList<Double> cluster = new ArrayList<Double>();
        cluster.add((double) survey1.getSeason());
        cluster.add((double) survey1.getTime());
        cluster.add((double) survey1.getGender());
        cluster.add((double) survey1.getTpo());
        cluster.add((double) survey1.getMood());
        dataSet.add(cluster);

        // (Season, Time, Gender, TPO, Mood, 클러스터 번호)
        KmeansAlgorithm d = new KmeansAlgorithm();
        ArrayList<ArrayList<Double>> dd = d.getClusters(dataSet, 10);  // 클러스터링

        // 리턴할 List<Perfume> 생성
        List<Perfume> list = new ArrayList<>();

        ArrayList<Double> temp = dd.get(dd.size() - 1);
//        System.out.println("temp의 클러스터 번호 : " + temp.get(temp.size() - 1));
        for (int i = 0; i < dd.size() - 1; i++) {
//            System.out.println(i+1 + "번 향수의 클러스터 번호 : " + dd.get(i).get(temp.size() - 1));
            if (temp.get(temp.size() - 1).doubleValue() == dd.get(i).get(temp.size() - 1).doubleValue()) {// 같은 그룹의 향수
                list.add(perfumeRepository.findByPerfumeId((long) i+1).get());
            }
        }

        Collections.shuffle(list);  // 리스트 랜덤 추출
        System.out.println("삭제전 : " + list.size());
        int cnt = list.size();
        for (int i = 5; i < cnt; i++){
            list.remove(0); //  5개 제외 나머지를 리스트에서 삭제
        }
        System.out.println("삭제후 : " + list.size());
        return list;
    }

    /* David : 설문조사2 조회 */
    @Override
    public Survey2 getSurvey2ByUserAndSurveyId(User user, Long surveyId) {
        Optional<Survey2> survey2 = survey2Repository.getSurvey2ByUserAndSurveyId(user, surveyId);
        return survey2.get();
    }

    /* David : 설문조사2 저장 */
    @Override
    public Map<String, List<Perfume>> insertSurvey2(User user, Survey2InsertRequest survey2InsertRequest) throws IOException {
        Optional<Perfume> checkPerfume = perfumeRepository.findByPerfumeId(survey2InsertRequest.getPerfumeId());

        Long count = survey2Repository.countByUser(user);
        if (count >= 3) {
            Survey2 orderSurvey2 = survey2Repository.findTop1ByUserOrderByCreateDateAsc(user);
            survey2Repository.delete(orderSurvey2);
        }

        Survey2 survey2 = Survey2.builder()
                .user(user)
                .surveyTitle(survey2InsertRequest.getSurveyTitle())
                .perfume(checkPerfume.get())
                .build();

        survey2Repository.save(survey2);

        //향수 추천
        Map<String, List<Perfume>> map = recommendPerfumeBySurvey2(survey2);

        return map;
    }

    /* David, Alice : 설문조사2 기반 향수 추천 */
    @Override
    public Map<String, List<Perfume>> recommendPerfumeBySurvey2(Survey2 survey2) throws IOException {

        ArrayList<ArrayList<Double>> dataSet = new ArrayList<ArrayList<Double>>();

        // 데이터셋 추가
//        String filePath = "src/main/resources/perfume/perfumes.xlsx";
//        File xlsx = new File(filePath);
//        XSSFWorkbook wb = new XSSFWorkbook(new FileInputStream(xlsx));

        ClassPathResource classPathResource = new ClassPathResource("perfume/perfumes.xlsx");
        if(classPathResource.exists() == false){
            System.out.println("이거 안되면 나도 몰라");
            throw new IllegalArgumentException();
        }
        XSSFWorkbook wb = new XSSFWorkbook(classPathResource.getInputStream());

        // 엑셀파일 전체 내용을 담고 있는 객체
        XSSFSheet sheet = wb.getSheetAt(0);
        XSSFRow row = null;
        XSSFCell cell = null;

        // 탐색에 사용할 sheet 객체
        for (int i = 1; i < sheet.getLastRowNum(); i++) {
            row = sheet.getRow(i);
            ArrayList<Double> cluster = new ArrayList<Double>();
            for (int j = 0; j < 5; j++) {
                cell = row.getCell(j);
                switch (cell.getCellType()) {
                    case Cell.CELL_TYPE_STRING:
                        cluster.add(Double.valueOf(cell.getStringCellValue()));
                        break;
                    case Cell.CELL_TYPE_NUMERIC:
                        cluster.add(cell.getNumericCellValue());
                        break;
                }
            }

            dataSet.add(cluster);   // 데이터셋 list에 데이터(Season, Time, Gender, TPO, Mood) 추가
        }

        // 설문조사 데이터를 dataSet 리스트에 추가
        ArrayList<Double> cluster = new ArrayList<Double>();
        Perfume perfume = survey2.getPerfume();
        cluster.add((double) perfume.getSeason());
        cluster.add((double) perfume.getTime());
        cluster.add((double) perfume.getGender());
        cluster.add((double) perfume.getTpo());
        cluster.add((double) perfume.getMood());
        dataSet.add(cluster);

        // (Season, Time, Gender, TPO, Mood, 클러스터 번호)
        KmeansAlgorithm d = new KmeansAlgorithm();
        ArrayList<ArrayList<Double>> dd = d.getClusters(dataSet, 10);  // 클러스터링

        // 비슷한 향수, 색다른 향수 추천 : 리턴할 List<Perfume> 생성
        List<Perfume> list = new ArrayList<>(); // 비슷한 향수 저장 리스트
        List<Perfume> list2 = new ArrayList<>();    // 색다른 향수 저장 리스트
        ArrayList<Double> temp = dd.get(dd.size() - 1);
        for (int i = 0; i < dd.size() - 1; i++) {
            if (temp.get(temp.size() - 1).doubleValue() == dd.get(i).get(temp.size() - 1).doubleValue()) {// 같은 그룹의 향수
                list.add(perfumeRepository.findByPerfumeId((long) i+1).get());
            } else{ // 다른 그룹의 향수
                list2.add(perfumeRepository.findByPerfumeId((long) i+1).get());
            }
        }

        Collections.shuffle(list);  // 리스트 랜덤 추출
        Collections.shuffle(list2);  // 리스트 랜덤 추출

        for (int i = 5; i < list.size(); i++) {
            list.remove(i); //  5개 제외 나머지를 리스트에서 삭제
            list2.remove(i);
        }

        Map<String, List<Perfume>> map = new HashMap<>();
        map.put("similar",list);
        map.put("different",list2);

        return map;
    }

    @Override
    public Survey3 getSurvey3ByUserAndSurveyId(User user, Long surveyId) {
        Optional<Survey3> survey3 = survey3Repository.getSurvey3ByUserAndSurveyId(user, surveyId);
        return survey3.get();
    }

    @Override
    public List<Perfume> insertSurvey3(User user, Survey3InsertRequest survey3InsertRequest) throws IOException {

        Long count = survey3Repository.countByUser(user);
        if (count >= 3) {
            Survey3 orderSurvey3 = survey3Repository.findTop1ByUserOrderByCreateDateAsc(user);
            survey3Repository.delete(orderSurvey3);
        }
        //스타일 구분
        Random rand = new Random();
        int value = rand.nextInt(13) + 1;
        Long styleId = Long.valueOf(value);
        System.out.println(styleId);

        Style style = styleRepository.findById(styleId).get();
        Survey3 survey3 = Survey3.builder()
                .user(user)
                .surveyTitle(survey3InsertRequest.getSurveyTitle())
                .style(style)
                .clothesUrl(survey3InsertRequest.getClothesUrl())
                .build();

        survey3Repository.save(survey3);
        List<Perfume> recommendList = recommendPerfumeBySurvey3(survey3);
        return recommendList;
    }

    @Override
    public List<Perfume> recommendPerfumeBySurvey3(Survey3 survey3) throws IOException {
        ArrayList<ArrayList<Double>> dataSet = new ArrayList<ArrayList<Double>>();

        // 데이터셋 추가
//        String filePath = "src/main/resources/perfume/perfumes.xlsx";
//        File xlsx = new File(filePath);
//        XSSFWorkbook wb = new XSSFWorkbook(new FileInputStream(xlsx));

        ClassPathResource classPathResource = new ClassPathResource("perfume/perfumes.xlsx");
        if(classPathResource.exists() == false){
            System.out.println("이거 안되면 나도 몰라");
            throw new IllegalArgumentException();
        }
        XSSFWorkbook wb = new XSSFWorkbook(classPathResource.getInputStream());

        // 엑셀파일 전체 내용을 담고 있는 객체
        XSSFSheet sheet = wb.getSheetAt(0);
        XSSFRow row = null;
        XSSFCell cell = null;

        // 탐색에 사용할 sheet 객체
        for (int i = 1; i < sheet.getLastRowNum(); i++) {
            row = sheet.getRow(i);
            ArrayList<Double> cluster = new ArrayList<Double>();
            for (int j = 0; j < 5; j++) {
                cell = row.getCell(j);
                switch (cell.getCellType()) {
                    case Cell.CELL_TYPE_STRING:
                        cluster.add(Double.valueOf(cell.getStringCellValue()));
                        break;
                    case Cell.CELL_TYPE_NUMERIC:
                        cluster.add(cell.getNumericCellValue());
                        break;
                }
            }

            dataSet.add(cluster);   // 데이터셋 list에 데이터(Season, Time, Gender, TPO, Mood) 추가
        }

        // 설문조사 데이터를 dataSet 리스트에 추가
        ArrayList<Double> cluster = new ArrayList<Double>();
        cluster.add((double) survey3.getStyle().getSeason());
        cluster.add((double) survey3.getStyle().getTime());
        cluster.add((double) survey3.getStyle().getGender());
        cluster.add((double) survey3.getStyle().getTpo());
        cluster.add((double) survey3.getStyle().getMood());
        dataSet.add(cluster);

        // (Season, Time, Gender, TPO, Mood, 클러스터 번호)
        KmeansAlgorithm d = new KmeansAlgorithm();
        ArrayList<ArrayList<Double>> dd = d.getClusters(dataSet, 10);  // 클러스터링

        // 리턴할 List<Perfume> 생성
        List<Perfume> list = new ArrayList<>();

        ArrayList<Double> temp = dd.get(dd.size() - 1);
//        System.out.println("temp의 클러스터 번호 : " + temp.get(temp.size() - 1));
        for (int i = 0; i < dd.size() - 1; i++) {
//            System.out.println(i+1 + "번 향수의 클러스터 번호 : " + dd.get(i).get(temp.size() - 1));
            if (temp.get(temp.size() - 1).doubleValue() == dd.get(i).get(temp.size() - 1).doubleValue()) {// 같은 그룹의 향수
                list.add(perfumeRepository.findByPerfumeId((long) i+1).get());
            }
        }

        Collections.shuffle(list);  // 리스트 랜덤 추출

        int cnt = list.size();
        for (int i = 5; i < cnt; i++){
            list.remove(0); //  5개 제외 나머지를 리스트에서 삭제
        }

        return list;
    }


}
