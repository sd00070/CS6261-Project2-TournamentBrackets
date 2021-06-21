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

  }
}
