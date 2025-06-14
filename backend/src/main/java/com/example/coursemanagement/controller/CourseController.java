package com.example.coursemanagement.controller;

import com.example.coursemanagement.model.Course;
import com.example.coursemanagement.model.User;
import com.example.coursemanagement.repository.CourseRepository;
import com.example.coursemanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    // 获取所有课程
    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = courseRepository.findAll();
        return ResponseEntity.ok(courses);
    }

    // 根据ID获取课程
    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        Optional<Course> course = courseRepository.findById(id);
        return course.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    // 创建新课程（教师功能）
    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody Course course, @RequestParam Long teacherId) {
        Optional<User> teacherOptional = userRepository.findById(teacherId);
        if (teacherOptional.isEmpty() || teacherOptional.get().getRole() != User.Role.teacher) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }

        if (courseRepository.existsByCode(course.getCode())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        course.setTeacher(teacherOptional.get());
        Course savedCourse = courseRepository.save(course);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCourse);
    }

    // 更新课程信息（教师功能）
    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody Course courseDetails, @RequestParam Long teacherId) {
        Optional<Course> courseOptional = courseRepository.findById(id);
        if (courseOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        Course course = courseOptional.get();
        if (!course.getTeacher().getId().equals(teacherId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }

        // 不允许修改课程代码
        course.setTitle(courseDetails.getTitle());
        course.setDescription(courseDetails.getDescription());
        course.setCredits(courseDetails.getCredits());

        Course updatedCourse = courseRepository.save(course);
        return ResponseEntity.ok(updatedCourse);
    }

    // 删除课程（教师功能）
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id, @RequestParam Long teacherId) {
        Optional<Course> courseOptional = courseRepository.findById(id);
        if (courseOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        Course course = courseOptional.get();
        if (!course.getTeacher().getId().equals(teacherId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }

        courseRepository.delete(course);
        return ResponseEntity.noContent().build();
    }

    // 根据教师ID获取课程
    @GetMapping("/teacher/{teacherId}")
    public ResponseEntity<List<Course>> getCoursesByTeacher(@PathVariable Long teacherId) {
        List<Course> courses = courseRepository.findByTeacherId(teacherId);
        return ResponseEntity.ok(courses);
    }

    // 搜索课程
    @GetMapping("/search")
    public ResponseEntity<List<Course>> searchCourses(@RequestParam String keyword) {
        List<Course> courses = courseRepository.findByTitleContainingIgnoreCase(keyword);
        return ResponseEntity.ok(courses);
    }
}