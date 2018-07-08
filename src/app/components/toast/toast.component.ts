import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { ToastInterface } from '../../interfaces/toast.interface';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  constructor(private toastService: ToastService) {}

  public currentToast: ToastInterface = null;

  public ngOnInit(): void {
    this.toastService.getToasts().subscribe((toast: ToastInterface) => {
      this.currentToast = toast;
      setTimeout(() => {
        this.closeToast();
      }, 4000);
    });
  }

  public closeToast(): void {
    this.currentToast = null;
  }
}
