import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { UserInterface } from '../../interfaces/user.interface';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  public hhForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.hhForm = new FormGroup({
      users: new FormArray([])
    });
  }

  ngOnInit() {
    this.apiService.getAllUsers().subscribe((response: any) => {
      if (response.success) {
        this.initForm(response.data);
      } else {
        this.toastService.addDefaultError();
      }
    });
  }

  public initForm(users: UserInterface[]): void {
    const controls: FormArray = this.hhForm.controls['users'] as FormArray;
    users.forEach((user: UserInterface) => {
      controls.push(
        new FormGroup({
          hh: new FormControl(user.hh, Validators.required),
          name: new FormControl(
            { value: user.name, disabled: true },
            Validators.required
          ),
          id: new FormControl(user.id, Validators.required),
          ok: new FormControl(user.ok, Validators.required)
        })
      );
    });
  }

  public get hhFormArray(): FormArray {
    return this.hhForm.controls['users'] as FormArray;
  }

  public onSubmit(value: any): void {
    let hhCounter: number = 0;
    value.users.forEach((user: any) => {
      if (user.ok > 5) { user.ok = 5; }
      if (user.ok < 1) { user.ok = 1; }
      if (user.hh) {
        hhCounter++;
      }
    });

    if (hhCounter === 1) {
      this.apiService.updateUsers(value.users).subscribe((response: any) => {
        if (response.success) {
          this.toastService.addToast(
            'success',
            'Uppdateringen lyckades',
            'Allt gick bra och någon annan är nu HH. Bara att kämpa på så kanske du blir HH imorgon på nytt'
          );
          this.router.navigateByUrl('/');
        } else {
          this.toastService.addToast(
            'error',
            'Något gick fel',
            'Det där gick inte så bra. Försök igen.'
          );
        }
      });
    } else {
      this.toastService.addToast(
        'error',
        'Felaktig inmatning',
        'Vad håller du på med? Endast en kan vara superhyrare och ha HH'
      );
    }
  }
}
