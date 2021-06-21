import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class RosterService {

  private contestants: string[] = []

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

  containsContestant(playerName: string): boolean {
    return RosterService.containsString(playerName, this.contestants)
  }

  addContestant(player: string | null) {
    if (player === null) throw new Error('Name should not be null')

    if (player === '') throw new Error('Name should not be empty')

    if (this.containsContestant(player)) throw new Error('Cannot add duplicate name')

    this.contestants.push(player)
  }

  isValidPlayer(player: string | null): boolean {
    return player !== null
      && player !== ''
      && !this.containsContestant(player)
  }

  clearRoster(): void {
    this.contestants = []
  }
}
