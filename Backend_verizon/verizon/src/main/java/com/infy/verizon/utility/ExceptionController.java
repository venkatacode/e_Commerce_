package com.infy.verizon.utility;

import java.util.ArrayList;

import java.util.List;
import java.util.stream.Collectors;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.infy.verizon.expection.EcommerceException;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class ExceptionController {

	private static final Log LOGGER = LogFactory.getLog(ExceptionController.class);

	private Environment environment;

	public ExceptionController(Environment environment) {
		this.environment=environment;
	}
	@ExceptionHandler(EcommerceException.class)
	public ResponseEntity<ErrorInfo> meetingSchedulerExceptionHandler(EcommerceException exception) {
		LOGGER.error(exception.getMessage(), exception);
		ErrorInfo errorInfo = new ErrorInfo();
		errorInfo.setErrorCode(HttpStatus.BAD_REQUEST.value());
		errorInfo.setErrorMessage(environment.getProperty(exception.getMessage()));
		return new ResponseEntity<>(errorInfo, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorInfo> generalExceptionHandler(Exception exception) {
		LOGGER.error(exception.getMessage(), exception);
		ErrorInfo errorInfo = new ErrorInfo();
		errorInfo.setErrorCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
		errorInfo.setErrorMessage(environment.getProperty("General.EXCEPTION_MESSAGE"));
		return new ResponseEntity<>(errorInfo, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler({ MethodArgumentNotValidException.class, ConstraintViolationException.class })
	public ResponseEntity<List<ErrorInfo>> validatorExceptionHandler(Exception exception) {
		LOGGER.error(exception.getMessage(), exception);
		String errorMsg;
		if (exception instanceof MethodArgumentNotValidException manvException) {
			errorMsg = manvException.getBindingResult().getAllErrors().stream().map(ObjectError::getDefaultMessage)
					.collect(Collectors.joining(", "));

		} else {
			ConstraintViolationException cvException = (ConstraintViolationException) exception;
			errorMsg = cvException.getConstraintViolations().stream().map(ConstraintViolation::getMessage)
					.collect(Collectors.joining(", "));

		}
		ErrorInfo errorInfo = new ErrorInfo();
		errorInfo.setErrorCode(HttpStatus.BAD_REQUEST.value());
		errorInfo.setErrorMessage(errorMsg);
		String[] strArr = errorMsg.split(",");
		List<ErrorInfo> errorList = new ArrayList<>();
		for (String s : strArr) {
			errorInfo.setErrorCode(HttpStatus.BAD_REQUEST.value());
			errorInfo.setErrorMessage(s);
			errorList.add(errorInfo);
		}

		return new ResponseEntity<>(errorList, HttpStatus.BAD_REQUEST);

	}
}
