package com.gabrieudev.rateio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.gabrieudev.rateio.infrastructure.config.AppProperties;

@SpringBootApplication(scanBasePackages = "com.gabrieudev.rateio")
@EnableConfigurationProperties(AppProperties.class)

@EnableJpaRepositories(basePackages = "com.gabrieudev.rateio.infrastructure.adapter.outgoing.persistence.repository")
@EntityScan(basePackages = "com.gabrieudev.rateio.infrastructure.adapter.outgoing.persistence.entity")

public class RateioApplication {

    public static void main(String[] args) {
        SpringApplication.run(RateioApplication.class, args);
    }
}
