import { Component, OnInit } from '@angular/core'
import { RosterService } from 'src/app/services/roster.service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public players: string[] = new Array(8).fill('')

  public message: string = ''

  constructor(
    private rosterService: RosterService,
  ) { }

  ngOnInit(): void {
  }

  registerContestants() {
    console.log(this.players)

    // const validPlayerCount = this.players.reduce((count: number, player: string) => {
    //   if (player === '') return count
    //   return count + 1
    // }, 0)

    // if (validPlayerCount !== 2 && validPlayerCount !== 4 && validPlayerCount !== 8) return

    // this.players.forEach(this.rosterService.addContestant)
  }

  trackByIndex(index: number, _item: any): number {
    return index
  }
}
