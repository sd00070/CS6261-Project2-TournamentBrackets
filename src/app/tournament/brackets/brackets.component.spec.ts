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
})
