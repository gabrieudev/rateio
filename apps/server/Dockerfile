FROM maven:3.9-jdk-17 AS builder
WORKDIR /workspace

COPY pom.xml .
RUN --mount=type=cache,target=/root/.m2 mvn -B -DskipTests dependency:go-offline

COPY src ./src
RUN --mount=type=cache,target=/root/.m2 mvn -B -DskipTests package

FROM eclipse-temurin:17-jre-jammy AS runtime

LABEL org.opencontainers.image.source="https://github.com/gabrieudev/rateio" \
      org.opencontainers.image.licenses="MIT"

ARG APP_USER=app
ARG APP_GROUP=app
RUN groupadd -r ${APP_GROUP} && useradd -r -g ${APP_GROUP} ${APP_USER}

WORKDIR /app

COPY --from=builder /workspace/target/*.jar app.jar

RUN mkdir -p /app/logs && chown -R ${APP_USER}:${APP_GROUP} /app

USER ${APP_USER}

ENV JAVA_TOOL_OPTIONS="-XX:+UseG1GC -XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -XX:+HeapDumpOnOutOfMemoryError -Djava.security.egd=file:/dev/./urandom"

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD curl -f http://127.0.0.1:8080/actuator/health || exit 1

ENTRYPOINT ["sh","-c","exec java $JAVA_TOOL_OPTIONS -jar /app/app.jar"]