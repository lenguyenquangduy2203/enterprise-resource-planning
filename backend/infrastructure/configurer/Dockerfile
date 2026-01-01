# -------- BUILD --------
FROM jdk25-build-base AS build
WORKDIR /build

COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

RUN --mount=type=cache,target=/root/.m2 \
    ./mvnw -B -DskipTests dependency:resolve

COPY src src

RUN --mount=type=cache,target=/root/.m2 \
    ./mvnw -B -DskipTests package


# -------- RUNTIME --------
FROM jdk25-runtime-base
WORKDIR /app

COPY --from=build /build/target/*.jar app.jar

EXPOSE 8888
ENTRYPOINT ["java","-jar","app.jar"]
