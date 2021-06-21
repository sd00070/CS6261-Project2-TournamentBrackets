import { Component, OnInit } from '@angular/core'
import { RosterService } from 'src/app/services/roster.service';

@Component({
  selector: 'app-brackets',
  templateUrl: './brackets.component.html',
  styleUrls: ['./brackets.component.scss']
})
export class BracketsComponent implements OnInit {

  public roundNumber: number = 1

  constructor(private rosterService: RosterService) { }

  get contestants(): string[] {
    return this.rosterService.getContestants()
  }

  hasContestants(): boolean {
    return this.rosterService.hasContestants()
  }

  ngOnInit(): void {
  }

}
