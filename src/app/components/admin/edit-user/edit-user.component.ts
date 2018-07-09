import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserInterface } from '../../../interfaces/user.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  @Input() public user: UserInterface;
  @Output() public close: EventEmitter<any> = new EventEmitter<any>();

  public editForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.editForm = new FormGroup({
      name: new FormControl(this.user.name, Validators.required),
      username: new FormControl(this.user.username, Validators.required),
      hh: new FormControl(this.user.hh, Validators.required),
      ok: new FormControl(this.user.ok, Validators.required),
      admin: new FormControl(this.user.admin, Validators.required)
    });
  }

  public closeEditor(): void {
    this.close.emit();
  }

  public save(values: any) {
    this.apiService
      .updateUser(this.user.id, values)
      .subscribe((response: any) => {
        if (response.success) {
          this.toastService.addToast(
            'success',
            'Ändringen lyckades',
            'Användaren är nu uppdaterad och har nya värden.'
          );
        } else {
          this.toastService.addToast(
            'error',
            'Ändringen misslyckades',
            'Något gick fel. Försök igen.'
          );
        }
      });
  }
}
