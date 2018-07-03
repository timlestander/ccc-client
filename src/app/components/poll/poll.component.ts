import { Component, OnInit } from "@angular/core";
import { PollInterface } from "../../interfaces/poll.interface";
import { ApiService } from "../../services/api.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "poll",
  templateUrl: "./poll.component.html",
  styleUrls: ["./poll.component.css"]
})
export class PollComponent implements OnInit {
  public poll: PollInterface;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const pollId = parseInt(params.get("id"));
      this.apiService.getPollById(pollId).subscribe((poll: PollInterface) => {
        this.poll = poll;
      });
    });
  }
}
