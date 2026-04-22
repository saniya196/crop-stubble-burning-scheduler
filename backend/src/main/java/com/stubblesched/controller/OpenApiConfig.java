package com.stubblesched.controller;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI stubbleSchedOpenApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("StubbleSched API")
                        .description("Crop Stubble Burning Scheduler REST API")
                        .version("1.0.0")
                        .contact(new Contact().name("StubbleSched Team"))
                        .license(new License().name("MIT")));
    }
}
