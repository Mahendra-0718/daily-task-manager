
package com.example.dailytaskmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.dailytaskmanager.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
}

