import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { UserInterface } from '../../interfaces/user.interface';
import { Validators, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  public hhForm: FormGroup;

  constructor(private apiService: ApiService) {
    this.hhForm = new FormGroup({
      users: new FormArray([])
    });
  }

  ngOnInit() {
    this.apiService.getAllUsers().subscribe((users: UserInterface[]) => {
      this.initForm(users);
    });
  }

  public initForm(users: UserInterface[]): void {
    let controls: FormArray = this.hhForm.controls['users'] as FormArray;
    users.forEach((user: UserInterface) => {
      controls.push(
        new FormGroup({
          hh: new FormControl(user.hh, Validators.required),
          name: new FormControl(
            { value: user.name, disabled: true },
            Validators.required
          ),
          ok: new FormControl(user.ok, Validators.required)
        })
      );
    });
  }

  public get hhFormArray(): FormArray {
    return this.hhForm.controls['users'] as FormArray;
  }
}
