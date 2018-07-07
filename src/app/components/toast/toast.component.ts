import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { ToastInterface } from '../../interfaces/toast.interface';

@Component({
  selector: 'toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  constructor(private toastService: ToastService) {}

  public currentToast: ToastInterface = null;
  public toastTimer: any;

  public ngOnInit(): void {
    this.toastService.getToasts().subscribe((toast: ToastInterface) => {
      clearInterval(this.toastTimer);
      this.currentToast = toast;
      this.toastTimer = setTimeout(() => {
        this.closeToast();
      }, 8000);
    });
  }

  public closeToast(): void {
    this.currentToast = null;
  }
}
