export class Match {
    public winnerIndex: number

    constructor(
        public player1: string,
        public player2: string,
    ) {
        this.winnerIndex = 0
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