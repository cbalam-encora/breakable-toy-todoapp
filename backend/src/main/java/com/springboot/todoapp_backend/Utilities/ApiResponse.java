package com.springboot.todoapp_backend.Utilities;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class ApiResponse<T> {

    public int status;
    private String message;
    private T data;

    public static <T> ApiResponse<T> success(String message, T data){
        return new ApiResponse<>(HttpStatus.OK.value(), message, data);
    }
    public static <T> ApiResponse<T> error(String message, HttpStatus status){
        return new ApiResponse<>(status.value(), message, null);
    }
    public static <T> ApiResponse<T> error(String message){
        return new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), message, null);
    }

}
