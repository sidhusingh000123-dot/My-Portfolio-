package com.portfolio.portfolio;

import com.portfolio.portfolio.model.Project;
import com.portfolio.portfolio.repository.ProjectRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class PortfolioApplication {

    public static void main(String[] args) {
        SpringApplication.run(PortfolioApplication.class, args);
    }

    // Seeds a few sample projects the first time the app runs against an empty table.
    // Edit these to showcase your own work, or remove this bean once you add real data.
    @Bean
    CommandLineRunner seedData(ProjectRepository projectRepository) {
        return args -> {
            if (projectRepository.count() == 0) {
                projectRepository.save(new Project(
                        null,
                        "E-Commerce Platform",
                        "A full-stack e-commerce app with product catalog, cart and order management.",
                        "Spring Boot, React, MySQL",
                        "https://github.com/yourusername/ecommerce-app",
                        "https://your-live-demo-link.com"
                ));
                projectRepository.save(new Project(
                        null,
                        "Task Manager API",
                        "REST API for managing tasks and projects with JWT authentication.",
                        "Java, Spring Boot, Spring Security, MySQL",
                        "https://github.com/yourusername/task-manager-api",
                        ""
                ));
                projectRepository.save(new Project(
                        null,
                        "Personal Portfolio",
                        "This very website — a responsive portfolio built with Spring Boot and vanilla JS.",
                        "HTML, CSS, JavaScript, Spring Boot, MySQL",
                        "https://github.com/yourusername/portfolio",
                        ""
                ));
            }
        };
    }
}
