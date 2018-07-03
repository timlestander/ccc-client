import { Component, OnInit } from '@angular/core';
import { UserInterface } from "../../interfaces/user.interface";
import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { ApiService } from "../../services/api.service";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public user: UserInterface;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const userId = parseInt(params.get("id"));
      this.apiService.getUserById(userId).subscribe((user: UserInterface) => {
        this.user = user;
      })
    })
  }

}
