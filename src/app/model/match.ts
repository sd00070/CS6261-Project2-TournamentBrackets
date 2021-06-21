export class Match {
    public winner: string

    constructor(
        public player1: string,
        public player2: string,
    ) {
        this.winner = this.player1
    }

    static partition(roster: string[]): Match[] {
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