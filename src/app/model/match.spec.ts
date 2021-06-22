import { Match } from './match'

describe('Match', () => {
  let testMatch: Match

  beforeEach(() => {
    testMatch = new Match('player1', 'player2')
  })

  describe('player1 setter & getter', () => {
    it('should set the Match\'s player1 to the given value', () => {
      testMatch.player1 = 'Sun Tzu'
      expect(testMatch.player1).toEqual('Sun Tzu')
    })

    it('should throw an error if passed an empty string', () => {
      expect(() => { testMatch.player1 = '' }).toThrow(new Error('cannot set player1 to empty string'))
    })

    it('if the winner is set to player1, changes the winner as well', () => {
      testMatch.winner = testMatch.player1
      testMatch.player1 = 'Sun Tzu'
      expect(testMatch.winner).toEqual('Sun Tzu')
    })
  })

  describe('player2 setter & getter', () => {
    it('should set Match\'s player2 to the given value', () => {
      testMatch.player2 = 'Wumen Huikai'
      expect(testMatch.player2).toEqual('Wumen Huikai')
    })

    it('should throw an error if passed an empty string', () => {
      expect(() => { testMatch.player2 = '' }).toThrow(new Error('cannot set player2 to empty string'))
    })

    it('if the winner is set to player2, changes the winner as well', () => {
      testMatch.winner = testMatch.player2
      testMatch.player2 = 'Wumen Huikai'
      expect(testMatch.winner).toEqual('Wumen Huikai')
    })
  })

  describe('winner setter & getter', () => {
    it('should set Match\'s winner to the given value', () => {
      testMatch.winner = 'Dom Cobb'
      expect(testMatch.winner).toEqual('Dom Cobb')
    })

    it('should throw an error if passed an empty string', () => {
      expect(() => { testMatch.winner = '' }).toThrow(new Error('cannot set winner to empty string'))
    })
  })

  describe('static partition', () => {
    it('when passed 2 players, should create an array with a Match from those players', () => {
      expect(Match.partition(['Luke', 'Han'])).toEqual([new Match('Luke', 'Han')])
    })

    it('when passed 4 players, should create an array of 2 Matches from those players', () => {
      expect(Match.partition(['Mike', 'Don', 'Leo', 'Ralphie'])).toEqual([new Match('Mike', 'Don'), new Match('Leo', 'Ralphie')])
    })

    it('should throw an error if the number of players is not even', () => {
      expect(() => Match.partition(['Ed', 'Edd', 'Eddy'])).toThrow(new Error('Player roster must contain an even number of players'))
    })
  })
})