import { TestBed } from '@angular/core/testing'

import { RosterService } from './roster.service'

describe('RosterService', () => {
  let rosterService: RosterService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    rosterService = TestBed.inject(RosterService)
  })

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
