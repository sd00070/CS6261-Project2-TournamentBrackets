import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Match } from 'src/app/model/match'

import { BracketsComponent } from './brackets.component'

describe('BracketsComponent', () => {
  let component: BracketsComponent
  let fixture: ComponentFixture<BracketsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BracketsComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(BracketsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should start with an empty match list', () => {
    expect(component.matches).toEqual([])
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
