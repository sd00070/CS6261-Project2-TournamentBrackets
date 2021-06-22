export class Match {
    private _winner: string

    constructor(
        private _player1: string,
        private _player2: string,
    ) {
        this._winner = this._player1
    }

    get player1(): string { return this._player1 }

    set player1(newPlayer1: string) {
        if (newPlayer1 === '') throw new Error('cannot set player1 to empty string')

        if (this._winner === this._player1) this._winner = newPlayer1

        this._player1 = newPlayer1
    }

    get player2(): string { return this._player2 }

    set player2(newPlayer2: string) {
        if (newPlayer2 === '') throw new Error('cannot set player2 to empty string')

        if (this._winner === this._player2) this._winner = newPlayer2

        this._player2 = newPlayer2
    }

    get winner(): string { return this._winner }

    set winner(newWinner: string) {
        if (newWinner === '') throw new Error('cannot set winner to empty string')

        this._winner = newWinner
    }

    static partition(roster: string[]): Match[] {
        if (roster.length % 2 === 1) throw new Error('Player roster must contain an even number of players')

        let tempRoster = [...roster]
        let matches: Match[] = []
        while (tempRoster.length > 0) {
            let p2 = tempRoster.pop()
            let p1 = tempRoster.pop()
            if (p1 && p2) matches.push(new Match(p1, p2))
        }
        return matches.reverse()
    }
}