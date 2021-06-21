import { TestBed } from '@angular/core/testing'

import { RosterService } from './roster.service'

describe('RosterService', () => {
  let rosterService: RosterService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    rosterService = TestBed.inject(RosterService)
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

  describe('clearRoster', () => {
    it('should set the roster to an empty array', () => {
      rosterService.addContestant('Sonic')
      rosterService.addContestant('Elise')
      rosterService.clearRoster()
      expect(rosterService.getContestants()).toEqual([])
    })
  })
})
