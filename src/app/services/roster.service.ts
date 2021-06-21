import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class RosterService {

  // TODO: change back to empty array
  private contestants: string[] = ['player1', 'player2', 'player3', 'player4', 'player5', 'player6', 'player7', 'player8']
  // private contestants: string[] = []

  constructor() { }

  getContestants(): string[] {
    return this.contestants
  }

  hasContestants(): boolean {
    return this.contestants.length > 0
  }

  static containsString(string: string, array: string[]): boolean {
    return array.some((element: string) => element === string)
  }

  addContestant(player: string | null) {
    RosterService.throwErrorIfPlayerIsInvalid(player, this.contestants)

    // typescript is making me check this again even though I know it cannot be null
    if (player) this.contestants.push(player)
  }

  static throwErrorIfPlayerIsInvalid(player: string | null, playerArray: string[]): void {
    if (player === null) throw new Error('Name should not be null')

    if (player === '') throw new Error('Name should not be empty')

    if (RosterService.containsString(player, playerArray)) throw new Error('Cannot add duplicate name')
  }

  static throwErrorIfRosterIsInvalidLength(roster: string[]) {
    if (
      roster.length !== 2
      && roster.length !== 4
      && roster.length !== 8
    ) throw new Error('Must contain 2, 4, or 8 players')
  }

  clearRoster(): void {
    this.contestants = []
  }
}
