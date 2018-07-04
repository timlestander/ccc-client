import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: []
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastService
  ) {
    this.loginForm = fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  ngOnInit() {}

  public onSubmit(values: any): void {
    this.authService
      .login(values.username, values.password)
      .subscribe((result: any) => {
        if (result.success) {
          this.router.navigateByUrl('/');
        } else {
          this.toastService.addToast('error', result.title, result.message);
        }
      });
  }
}
