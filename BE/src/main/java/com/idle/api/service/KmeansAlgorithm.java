/**
*
* KmeansAlgorithm
* 설문조사 1을 위한 Kmeans 알고리즘
*
* @author Alice
* @version 1.0.0
* 생성일 2022-03-31
* 마지막 수정일 2022-03-31
**/
package com.idle.api.service;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;

public class KmeansAlgorithm {
    private static final int T = 10; // 클러스터 중심점 변경 반복 횟수
    private static final double THRESHOLD = 0.1; // 모든 데이터들과 클러스터 간의 거리 총합 최소기준

    /**
     *
     * @Title: getClusters
     * @Description: 데이터의 개수만큼 클러스터 구하기
     * @return ArrayList<ArrayList<Double>>
     * @throws
     */
    public ArrayList<ArrayList<Double>> getClusters(ArrayList<ArrayList<Double>> dataSet, int k) {
        int dataDimension = 0;
        if(null != dataSet && dataSet.size() < k) { // (데이터 개수 < 클러스터 개수) 일 때
            System.out.println("data size is smaller than the number to be clustered");
        } else {
            dataDimension = dataSet.get(0).size();
        }

        // 데이터들의 클러스터를 0으로 초기화
        for(int i = 0; i < dataSet.size(); i++) {
            dataSet.get(i).add(0d);
        }

        // k개(클러스터 개수)의 중심점을 데이터의 앞 k개로 생성
        ArrayList<ArrayList<Double>> centerData = new ArrayList<ArrayList<Double>>();
        for(int i = 0; i < k; i++) {
            centerData.add(dataSet.get(i));
        }

        // 데이터마다 최소 거리의 클러스터 찾기
        for(int i = 0; i < T; i++) {    // 10번 반복
            for(int j = 0; j < dataSet.size(); j++) {   // 데이터마다 최소 거리의 클러스터 찾기
                double classify = 0; // classify   0 k-1  k
                double minDistance = computeDistance(dataSet.get(j), centerData.get(0));
                for(int l = 1; l < centerData.size(); l++) {
                    if(computeDistance(dataSet.get(j), centerData.get(l)) < minDistance) {
                        minDistance = computeDistance(dataSet.get(j), centerData.get(l));
                        classify = l;   // 클러스터 번호
                    }

                }
                dataSet.get(j).set(dataDimension, classify);    // 2번 인덱스(클러스터 번호) 값 변경
            }

            // 모든 데이터들과 클러스터 간의 거리 총합 구하기, 0.1보다 작으면 break
            double variance = computeChange(dataSet, centerData, k, dataDimension);
            if(variance < THRESHOLD) {
                break;
            }

            // 클러스터 중심점 위치 변경
            centerData = computeCenterData(dataSet, k, dataDimension);
        }

//        System.out.println("클러스터 중심점 : ");
//        for (int i = 0; i < centerData.size(); i++){
//            System.out.println(centerData.get(i));
//        }

        return dataSet;
    }

    /**
     *
     * @Title: computeDistance
     * @Description: 데이터와 클러스터 중심까지의 거리 계산 (유클리드)
     * @return double
     * @throws
     */
    public double computeDistance(ArrayList<Double> d1, ArrayList<Double> d2) {
        double squareSum = 0;
        for(int i = 0; i < d1.size() - 1; i++) {
            squareSum += (d1.get(i) - d2.get(i)) * (d1.get(i) - d2.get(i));
        }
        return Math.sqrt(squareSum);
    }

    /**
     *
     * @Title: computeCenterData
     * @Description: 클러스터 중심점 위치 변경
     * @return ArrayList<ArrayList<Double>>
     * @throws
     */
    public ArrayList<ArrayList<Double>> computeCenterData(ArrayList<ArrayList<Double>> dataSet, int k, int dataDimension) {
        ArrayList<ArrayList<Double>> res = new ArrayList<ArrayList<Double>>();
        for(int i = 0; i < k; i++) {
            int ClassNum = 0;
            ArrayList<Double> tmp = new ArrayList<Double>();
            for(int l = 0; l < dataDimension; l++) {
                tmp.add(0d);
            }
            for(int j = 0; j < dataSet.size(); j++) {
                if(dataSet.get(j).get(dataDimension) == i) {
                    ClassNum++;
                    for(int m = 0; m < dataDimension; m++) {
                        tmp.set(m, tmp.get(m) + dataSet.get(j).get(m));
                    }
                }
            }
            for(int l = 0; l < dataDimension; l++) {
                tmp.set(l, tmp.get(l) / (double)ClassNum);
            }
            res.add(tmp);
        }
        return res;
    }
    /**
     *
     * @Title: computeChange
     * @Description: 모든 데이터들과 클러스터 간의 거리 총합 구하기
     * @return double
     * @throws
     */
    public double computeChange(ArrayList<ArrayList<Double>> dataSet, ArrayList<ArrayList<Double>> centerData, int k, int dataDimension) {
        double variance = 0;
        ArrayList<ArrayList<Double>> originalCenterData = computeCenterData(dataSet, k, dataDimension);
        for(int i = 0; i < centerData.size(); i++) {
            variance += computeDistance(originalCenterData.get(i), centerData.get(i));
        }
        return variance;
    }

    public static void main(String[] args) throws IOException {

        ArrayList<ArrayList<Double>> dataSet = new ArrayList<ArrayList<Double>>();

        // 데이터셋 추가
        String filePath = "src/main/resources/perfume/perfumes.xlsx";
        File xlsx = new File(filePath);
        XSSFWorkbook wb = new XSSFWorkbook(new FileInputStream(xlsx));

        // 엑셀파일 전체 내용을 담고 있는 객체
        XSSFSheet sheet = wb.getSheetAt(0);
        XSSFRow row = null;

        // 탐색에 사용할 sheet 객체
        for(int i = 1; i < sheet.getLastRowNum(); i++) {
            row = sheet.getRow(i);
            ArrayList<Double> cluster = new ArrayList<Double>();
            for (Cell cell : row) {
                switch (cell.getCellType()) {
                    case Cell.CELL_TYPE_STRING:
                        cluster.add(Double.valueOf(cell.getStringCellValue()));
                        System.out.print(cell.getStringCellValue());
                        break;
                    case Cell.CELL_TYPE_NUMERIC:
                        cluster.add(cell.getNumericCellValue());
                        System.out.print(cell.getNumericCellValue());
                        break;
                }
                System.out.print(" ");
            }
            
            dataSet.add(cluster);   // 데이터셋 list에 데이터(Season, Time, Gender, TPO, Mood) 추가
            System.out.println();
        }

        KmeansAlgorithm d = new KmeansAlgorithm();
        ArrayList<ArrayList<Double>> dd  = d.getClusters(dataSet, 10);
        // Season, Time, Gender, TPO, Mood, 클러스터 번호
//        System.out.println("데이터들 : ");
//        System.out.println(dd);
    }
}