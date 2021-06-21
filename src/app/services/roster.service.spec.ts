import { TestBed } from '@angular/core/testing'

import { RosterService } from './roster.service'

describe('RosterService', () => {
  let rosterService: RosterService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    rosterService = TestBed.inject(RosterService)
  })

  xit('should not allow duplicate names', () => {

  })

  xit('should not allow null names', () => {

  })

  xit('should not allow empty string names', () => {

  })

  xit('should add one contestant', () => {

  })

  xit('should add several contestants', () => {

  })
})
