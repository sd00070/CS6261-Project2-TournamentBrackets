import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NgForm, NgModel } from '@angular/forms'
import { Match } from 'src/app/model/match'
import { RosterService } from 'src/app/services/roster.service'

import { BracketsComponent } from './brackets.component'

describe('BracketsComponent', () => {
  let component: BracketsComponent
  let fixture: ComponentFixture<BracketsComponent>

  beforeEach(async () => {
    let rosterServiceStub: Partial<RosterService> = {
      getContestants: () => ['one', 'two']
    }

    await TestBed.configureTestingModule({
      declarations: [
        BracketsComponent,
        NgForm,
        NgModel
      ],
      providers: [
        {
          provide: RosterService,
          useValue: rosterServiceStub
        }
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(BracketsComponent)
    component = fixture.componentInstance

    fixture.detectChanges()
  })

  it('should start on round 1', () => {
    expect(component.roundNumber).toBe(1)
  })

  describe('onInit', () => {
    it('should set matches to the partitioned roster', () => {
      expect(component.matches).toEqual([new Match('one', 'two')])
    })
  })

  describe('hasMatches', () => {
    it('should return true if there is at least one match', () => {
      component.matches = [new Match('one', 'two')]
      expect(component.hasMatches()).toBeTrue()
    })

    it('should return false if the matches list is empty', () => {
      component.matches = []
      expect(component.hasMatches()).toBeFalse()
    })
  })

  describe('completeRound', () => {
    it('should increment the round number if there are more than one match', () => {
      component.matches = [new Match('one', 'two'), new Match('three', 'four')]
      component.completeRound()
      expect(component.roundNumber).toBe(2)
    })

    it('should half the number of matches', () => {
      component.matches = [new Match('a', 'b'), new Match('c', 'd')]
      component.completeRound()
      expect(component.matches.length).toBe(1)

      component.matches = [new Match('a', 'b'), new Match('c', 'd'), new Match('e', 'f'), new Match('g', 'h')]
      component.completeRound()
      expect(component.matches.length).toBe(2)
    })

    it('should set the winner if and only if there is only one match', () => {
      let testMatch = new Match('a', 'b')

      component.matches = [testMatch]
      component.completeRound()
      expect(component.winner).toEqual(testMatch.winner)

      component.winner = ''
      component.matches = [testMatch, new Match('c', 'd')]
      component.completeRound()
      expect(component.winner).toEqual('')
    })

    it('should set matches to a new set of matches from the winners', () => {
      let match1 = new Match('a', 'b')
      let match2 = new Match('c', 'd')

      component.matches = [match1, match2]

      component.completeRound()
      expect(component.matches).toEqual([new Match(match1.winner, match2.winner)])
    })
  })
})
