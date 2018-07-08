import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
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
export class CreatePollComponent implements OnInit, OnDestroy {
  public pollForm: FormGroup;

  private unsubscribe$: Subject<void> = new Subject<void>();

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
    const control = this.pollForm.controls['options'] as FormArray;
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
    const optionsData: OptionInterface[] = [];
    values.options.forEach((option: any) => {
      optionsData.push({ text: option.text });
    });
    const pollData: PollInterface = {
      question: values.question,
      userId: this.authService.user.id
    };
    this.apiService.submitPoll(pollData, optionsData)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (response: any) => {
        if (response.success) {
          this.toastService.addToast(
            'success',
            'Ärendet skapades',
            'Allting gick enligt planen. Nu kan du slänga iväg en röst'
          );
          this.router.navigateByUrl('/polls');
        }
      },
      (error: any) => {
        this.toastService.addToast(
          'error',
          'Någonting gick fel',
          'Det är högst oklart vad som gick fel. Men det finns läge att oroa sig.'
        );
      }
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
