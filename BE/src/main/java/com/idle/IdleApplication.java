package com.idle;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

// Pytorch
import java.io.IOException;
import java.nio.file.*;
import java.awt.image.*;

import ai.djl.*;
import ai.djl.inference.*;
import ai.djl.modality.*;
import ai.djl.modality.cv.*;
import ai.djl.modality.cv.util.*;
import ai.djl.modality.cv.transform.*;
import ai.djl.modality.cv.translator.*;
import ai.djl.repository.zoo.*;
import ai.djl.translate.*;
import ai.djl.training.util.*;


@SpringBootApplication(exclude = SecurityAutoConfiguration.class)    // Security 자동으로 넘어가기
@EnableJpaAuditing    // BaseTimeEntity 에서 사용하는 JPA Auditing을 사용할 수 있게 함
public class IdleApplication {

    public static void main(String[] args) throws ModelNotFoundException, MalformedModelException, IOException, TranslateException {

//		SpringApplication.run(IdleApplication.class, args);

        // Pytorch 모델 로드 테스트
        Translator<Image, Classifications> translator = ImageClassificationTranslator.builder()
                .addTransform(new Resize(256))
                .addTransform(new CenterCrop(224, 224))
                .addTransform(new ToTensor())
                .addTransform(new Normalize(
                        new float[] {0.485f, 0.456f, 0.406f},
                        new float[] {0.229f, 0.224f, 0.225f}))
                .optApplySoftmax(true)
                .build();

        Criteria<Image, Classifications> criteria = Criteria.builder()
                .setTypes(Image.class, Classifications.class)
                .optModelName("../../resources/pytorch/model_category_best.pth")
                .optOption("mapLocation", "true") // this model requires mapLocation for GPU
                .optProgress(new ProgressBar())
                .build();

        ZooModel<Image, Classifications> model = criteria.loadModel();

        var img = ImageFactory.getInstance().fromUrl("https://raw.githubusercontent.com/pytorch/hub/master/images/dog.jpg");
        img.getWrappedImage();

        Predictor<Image, Classifications> predictor = model.newPredictor();
        Classifications classifications = predictor.predict(img);

        System.out.println("classifications\n" + classifications);
    }

}
