import { Component, OnInit } from '@angular/core'
import { Match } from 'src/app/model/match';
import { RosterService } from 'src/app/services/roster.service';

@Component({
  selector: 'app-brackets',
  templateUrl: './brackets.component.html',
  styleUrls: ['./brackets.component.scss']
})
export class BracketsComponent implements OnInit {

  public roundNumber: number = 1

  public matches: Match[] = []

  public winner: string = ''

  constructor(private rosterService: RosterService) { }

  hasMatches(): boolean {
    return this.matches.length > 0
  }

  ngOnInit(): void {
    this.matches = Match.partition(this.rosterService.getContestants())
  }

  // TODO: test this method
  completeRound(): void {
    let winners: string[] = this.matches.map((match: Match) => match.winner)

    if (winners.length === 1) {
      this.winner = winners[0]
      return
    }

    this.matches = Match.partition(winners)

    this.roundNumber++
  }
}
