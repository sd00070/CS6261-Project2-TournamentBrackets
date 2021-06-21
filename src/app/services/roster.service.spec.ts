import { TestBed } from '@angular/core/testing'

import { RosterService } from './roster.service'

describe('RosterService', () => {
  let rosterService: RosterService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    rosterService = TestBed.inject(RosterService)
  })

  describe('getContestants', () => {
    it('should return the array of contestants', () => {
      expect(rosterService.getContestants()).toEqual([])
    })
  })

  describe('hasContestants', () => {
    it('should return false when the array is empty', () => {
      expect(rosterService.hasContestants()).toBeFalse()
    })

    it('should return true when the array contains values', () => {
      rosterService.addContestant('Jack')
      rosterService.addContestant('Kate')
      expect(rosterService.hasContestants()).toBeTrue()
    })
  })

  describe('static containsString', () => {
    it('should return false if the array is empty', () => {
      expect(RosterService.containsString('hello', [])).toBeFalse()
    })

    it('should return false if the string is not in the array', () => {
      expect(RosterService.containsString('hello', ['world', '!'])).toBeFalse()
    })

    it('should return true if the string is in the array', () => {
      expect(RosterService.containsString('hello', ['hello', 'world', '!'])).toBeTrue()
    })
  })

  describe('addContestant', () => {
    it('should not allow duplicate names', () => {
      rosterService.addContestant('Bill')
      expect(() => { rosterService.addContestant('Bill') }).toThrow(new Error('Cannot add duplicate name'))
    })

    it('should not allow null names', () => {
      expect(() => { rosterService.addContestant(null) }).toThrow(new Error('Name should not be null'))
    })

    it('should not allow empty string names', () => {
      expect(() => { rosterService.addContestant('') }).toThrow(new Error('Name should not be empty'))
    })

    it('should add one contestant', () => {
      expect(rosterService.getContestants().length).toBe(0)

      rosterService.addContestant('Fred')
      expect(rosterService.getContestants().length).toBe(1)
      expect(rosterService.getContestants()[0]).toEqual('Fred')
    })

    it('should add several contestants', () => {
      expect(rosterService.getContestants().length).toBe(0)

      rosterService.addContestant('Jesse')
      rosterService.addContestant('James')
      rosterService.addContestant('Bruce')
      rosterService.addContestant('Cassidy')

      expect(rosterService.getContestants().length).toBe(4)
      expect(rosterService.getContestants()[0]).toEqual('Jesse')
      expect(rosterService.getContestants()[1]).toEqual('James')
      expect(rosterService.getContestants()[2]).toEqual('Bruce')
      expect(rosterService.getContestants()[3]).toEqual('Cassidy')
    })
  })

  describe('static throwErrorIfPlayerIsInvalid', () => {
    it('should throw an error if the player is null', () => [
      expect(() => { RosterService.throwErrorIfPlayerIsInvalid(null, []) }).toThrow(new Error('Name should not be null'))
    ])

    it('should throw an error if the player is an empty string', () => {
      expect(() => { RosterService.throwErrorIfPlayerIsInvalid('', []) }).toThrow(new Error('Name should not be empty'))
    })

    it('should throw an error if the player is in the roster already', () => {
      expect(() => { RosterService.throwErrorIfPlayerIsInvalid('Doug', ['Doug']) }).toThrow(new Error('Cannot add duplicate name'))
    })

    it('should not throw an error if the user is valid', () => {
      const sturdyFunction = () => { RosterService.throwErrorIfPlayerIsInvalid('James', ['Alec']) }

      expect(sturdyFunction).not.toThrow(new Error('Name should not be null'))
      expect(sturdyFunction).not.toThrow(new Error('Name should not be empty'))
      expect(sturdyFunction).not.toThrow(new Error('Cannot add duplicate name'))
    })
  })

  describe('static throwErrorIfRosterIsInvalidLength', () => {
    it('should throw an error if the array is empty', () => {
      expect(() => { RosterService.throwErrorIfRosterIsInvalidLength([]) }).toThrow(new Error('Must contain 2, 4, or 8 players'))
    })

    it('should throw an error if the array is not 2, 4, or 8 long', () => {
      let testRoster = ['one']
      expect(() => { RosterService.throwErrorIfRosterIsInvalidLength(testRoster) }).toThrow(new Error('Must contain 2, 4, or 8 players'))
    })

    it('should not throw an error if it has exactly 2 players', () => {
      let testRoster = ['one', 'two']
      expect(() => { RosterService.throwErrorIfRosterIsInvalidLength(testRoster) }).not.toThrow(new Error('Must contain 2, 4, or 8 players'))
    })

    it('should not throw an error if it has exactly 4 players', () => {
      let testRoster = ['one', 'two', 'three', 'four']
      expect(() => { RosterService.throwErrorIfRosterIsInvalidLength(testRoster) }).not.toThrow(new Error('Must contain 2, 4, or 8 players'))
    })

    it('should not throw an error if it has exactly 8 players', () => {
      let testRoster = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']
      expect(() => { RosterService.throwErrorIfRosterIsInvalidLength(testRoster) }).not.toThrow(new Error('Must contain 2, 4, or 8 players'))
    })
  })

  describe('clearRoster', () => {
    it('should set the roster to an empty array', () => {
      rosterService.addContestant('Sonic')
      rosterService.addContestant('Elise')
      rosterService.clearRoster()
      expect(rosterService.getContestants()).toEqual([])
    })
  })
})
