# ---- ビルド用ステージ ----
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app
COPY . .
RUN ./gradlew buildFatJar --no-daemon

# ---- 実行用ステージ ----
FROM eclipse-temurin:21-jre
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:1.1.0 /lambda-adapter /opt/extensions/lambda-adapter
WORKDIR /app
COPY --from=build /app/build/libs/app.jar app.jar
ENV AWS_LWA_READINESS_CHECK_PATH=/health
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]