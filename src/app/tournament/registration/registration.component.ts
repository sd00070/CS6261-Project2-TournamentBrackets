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
    public rosterService: RosterService,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Ignoring empty values, adds the valid players to the RosterService.
   */
  registerContestants() {
    try {
      let trimmedPlayerList = this.players.filter(maybeEmptyString => maybeEmptyString !== '')

      let validPlayers = trimmedPlayerList.filter((player: string, index: number): boolean => {
        RosterService.throwErrorIfPlayerIsInvalid(player, trimmedPlayerList.slice(0, index).concat(trimmedPlayerList.slice(index + 1)))
        return true
      })

      RosterService.throwErrorIfRosterIsInvalidLength(validPlayers)

      this.rosterService.clearRoster()

      validPlayers.forEach((validPlayer: string) => this.rosterService.addContestant(validPlayer))

      this.message = this.rosterService.getContestants().join(', ')
    } catch (error) {
      this.message = error.message
    }
  }

  trackByIndex(index: number, _item: any): number {
    return index
  }

  autofill(count: number, sampleSet?: string[]): void {
    sampleSet = sampleSet || [
      'Spencer',
      'Jack',
      'Drew',
      'Michael',
      'Carrie',
      'Brooke',
      'Kate',
      'Paige',
      'Jeff',
      'Billy',
      'Walt',
      'Shawn',
      'Ben',
      'Adam',
      'Alana',
      'Rainie'
    ]

    let randomPlayers = (sampleSet.sort((_a: string, _b: string) => Math.random() > 0.5 ? -1 : 1)).slice(0, count)

    this.players = new Array(8).fill('')

    this.players.splice(0, count, ...randomPlayers)
  }
}
