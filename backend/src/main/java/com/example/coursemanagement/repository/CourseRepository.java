package com.example.coursemanagement.repository;

import com.example.coursemanagement.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    Optional<Course> findByCode(String code);
    List<Course> findByTeacherId(Long teacherId);
    List<Course> findByTitleContainingIgnoreCase(String title);
    boolean existsByCode(String code);
}