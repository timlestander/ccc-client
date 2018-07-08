import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ToastInterface } from '../interfaces/toast.interface';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public toasts: Subject<ToastInterface> = new Subject<ToastInterface>();

  constructor() {}

  public addToast(type: string, title: string, message: string): void {
    this.toasts.next(<ToastInterface>{
      type: type,
      title: title,
      message: message
    });
  }

  public getToasts(): Subject<ToastInterface> {
    return this.toasts;
  }

  public addDefaultError(): void {
    this.toasts.next({
      type: 'error',
      title: 'Serverfel',
      message:
        'Något gick fel på serversidan. Försök igen. Fungerar det inte testa att logga ut och in.'
    });
  }
}
