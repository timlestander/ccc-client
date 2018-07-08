import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { PollInterface } from '../../interfaces/poll.interface';
import { OptionInterface } from '../../interfaces/option.interface';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.scss']
})
export class CreatePollComponent implements OnInit {
  public pollForm: FormGroup;
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.pollForm = new FormGroup({
      question: new FormControl('', Validators.required),
      options: new FormArray([])
    });
    this.addOption();
    this.addOption();
  }

  public addOption(): void {
    let control = this.pollForm.controls['options'] as FormArray;
    control.push(
      new FormGroup({
        text: new FormControl('', Validators.required)
      })
    );
  }

  public get optionsFormArray(): FormArray {
    return this.pollForm.controls['options'] as FormArray;
  }

  public submitPoll(values: any): void {
    let optionsData: OptionInterface[] = [];
    values.options.forEach((option: any) => {
      optionsData.push({ text: option.text });
    });
    let pollData: PollInterface = {
      question: values.question,
      userId: this.authService.user.id
    };
    this.apiService
      .submitPoll(pollData, optionsData)
      .subscribe((response: any) => {
        if (response.success) {
          this.toastService.addToast(
            'success',
            'Ärendet skapades',
            'Allting gick enligt planen. Nu kan du slänga iväg en röst'
          );
          this.router.navigateByUrl('/polls');
        } else {
          this.toastService.addDefaultError();
        }
      });
  }

  ngOnInit() {}
}
