import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastInterface } from '../../interfaces/toast.interface';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastService
  ) {
    this.registerForm = fb.group({
      username: [null, Validators.required],
      name: [null, Validators.required],
      password: [null, Validators.required],
      password2: [null, Validators.required]
    });
  }

  public onSubmit(values: any): void {
    console.log(values);
    this.authService.register(values).subscribe((result: any) => {
      if (result.success) {
        this.router.navigateByUrl('/overview');
      } else {
        this.toastService.addToast('error', result.title, result.message);
      }
    });
  }

  ngOnInit() {}
}
