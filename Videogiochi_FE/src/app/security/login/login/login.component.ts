import { Component, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../../auth-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [FormsModule, NgStyle, NgIf],
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  user = { username: '', password: '', email: '' };
  isLoginMode: boolean = true;
  checkPass: string = '';
  @ViewChild('authForm') authForm!: NgForm;

  onSubmit() {
    if (this.isLoginMode) {
      this.login();
    } else {
      this.register();
    }
  }
  register() {
    this.authService.register(this.user).subscribe((response) => {
      console.log('User registered successfully', response);
      alert('Your registration was successful!');
      window.location.reload();
      this.isLoginMode = true;
    });
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.user).subscribe(
      (response) => {
        if (!this.authService.isLoggedIn) {
          console.log('Login failed');
          alert('Something went wrong');
          this.router.navigate(['/auth']);
          return;
        } else {
          console.log('User logged in successfully');
          this.router.navigate(['/']);
        }
      },
      (error) => {
        console.error('Login failed', error);
        alert('Login failed, check your username or password');
        return;
      }
    );
  }
  checkPassLength(): boolean {
    return this.user.password.length >= 6;
  }

  checkPassword(): boolean {
    return this.user.password === this.checkPass;
  }

  checkCorrectLogin(): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    }
    return false;
  }
}
