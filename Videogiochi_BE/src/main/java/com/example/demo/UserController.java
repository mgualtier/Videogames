package com.example.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

	private final UserService userService;

	public UserController(UserService userService) {
		super();
		this.userService = userService;
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> findUserById(@PathVariable Long id){
		User user = userService.getUserById(id);
		if(user == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<List<User>> getAllUtenti() {
		List<User> utenti = userService.getAllUsers();
		return new ResponseEntity<>(utenti, HttpStatus.OK);
	}

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody User user) {
		User registeredUser = userService.registerUser(user);
		if (registeredUser != null) {
			Map<String, Object> response = new HashMap<>();
			response.put("id", registeredUser.getId());
			response.put("username", registeredUser.getUsername());
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registration failed");
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user) {
		User authenticatedUser = userService.authenticateUser(user.getUsername(), user.getPassword());
		if (authenticatedUser != null) {
			Map<String, Object> response = new HashMap<>();
			Map<String, Object> userData = new HashMap<>();
			userData.put("id", authenticatedUser.getId());
			userData.put("username", authenticatedUser.getUsername());
			response.put("user", userData);

			return ResponseEntity.ok(response);
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
	}

	@PostMapping("/cookie-consent")
	public ResponseEntity<?> updateCookieConsent(
			@RequestBody CookieConsentRequest consentRequest) {

		User user = userService.getUserById(consentRequest.getUserId());

		if (user != null) {
			user.setCookieConsent(consentRequest.isConsent());
			userService.updateUser(user);
			return ResponseEntity.ok().build();
		}

		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	}


	@GetMapping("/cookie-consent")
	public ResponseEntity<?> getCookieConsent(@AuthenticationPrincipal User user) {
		if (user != null) {
			Map<String, Boolean> response = Collections.singletonMap("consent", user.isCookieConsent());
			return ResponseEntity.ok(response);
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	}

}