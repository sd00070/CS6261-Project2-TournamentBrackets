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

  addContestant(player: string | null) {
    if (player === null) throw new Error('Name should not be null')

    if (player === '') throw new Error('Name should not be empty')

    if (this.contestants.find((contestant: string) => player === contestant)) throw new Error('Cannot add duplicate name')

    this.contestants.push(player)
  }
}
