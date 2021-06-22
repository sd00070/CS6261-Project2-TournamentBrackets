import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NgForm, NgModel } from '@angular/forms'
import { RosterService } from 'src/app/services/roster.service'

import { RegistrationComponent } from './registration.component'

describe('RegistrationComponent', () => {
  let component: RegistrationComponent
  let fixture: ComponentFixture<RegistrationComponent>

  let rosterService: RosterService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RegistrationComponent,
        NgModel,
        NgForm
      ],
      providers: [RosterService]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent)
    component = fixture.componentInstance

    rosterService = fixture.debugElement.injector.get(RosterService)

    fixture.detectChanges()
  })

  it('should start with player list of length 8', () => {
    expect(component.players.length).toBe(8)
  })

  it('should start with all players set to empty string', () => {
    component.players.forEach((player: string) => expect(player).toEqual(''))
  })

  it('should start with an empty message', () => {
    expect(component.message).toEqual('')
  })

  describe('registerContestants', () => {
    it('should not change the roster if all players are empty', () => {
      component.registerContestants()
      expect(rosterService.getContestants()).toEqual([])
    })

    it('should not change the roster if the new one contains duplicates', () => {
      component.players = ['Ed', 'Edd', 'Eddy', 'Ed']
      component.registerContestants()
      expect(rosterService.getContestants()).toEqual([])
    })

    it('should change the roster if the new one contains 2 players', () => {
      component.players = ['Bob', 'Larry']
      component.registerContestants()
      expect(rosterService.getContestants()).toEqual(['Bob', 'Larry'])
    })

    it('should change the roster if the new one contains 4 players', () => {
      component.players = ['Moe', 'Curly', 'Larry', 'Emil']
      component.registerContestants()
      expect(rosterService.getContestants()).toEqual(['Moe', 'Curly', 'Larry', 'Emil'])
    })

    it('should change the roster if the new one contains 8 players', () => {
      component.players = ['1', '2', '3', '4', '5', '6', '7', '8']
      component.registerContestants()
      expect(rosterService.getContestants()).toEqual(['1', '2', '3', '4', '5', '6', '7', '8'])
    })

    it('should not change the roster if the new one does not contain 2, 4, or 8 players', () => {
      component.players = ['1']
      component.registerContestants()
      expect(rosterService.getContestants()).toEqual([])

      component.players = ['1', '2', '3']
      component.registerContestants()
      expect(rosterService.getContestants()).toEqual([])

      component.players = ['1', '2', '3', '4', '5']
      component.registerContestants()
      expect(rosterService.getContestants()).toEqual([])

      component.players = new Array(6).fill('a')
      component.registerContestants()
      expect(rosterService.getContestants()).toEqual([])

      component.players = new Array(7).fill('a')
      component.registerContestants()
      expect(rosterService.getContestants()).toEqual([])
    })

    it('should change the message to the appropriate message on an error', () => {
      expect(component.message).toEqual('')

      component.players = []
      component.registerContestants()
      expect(component.message).toEqual('Must contain 2, 4, or 8 players')

      component.players = ['1']
      component.registerContestants()
      expect(component.message).toEqual('Must contain 2, 4, or 8 players')


      component.players = ['1', '1']
      component.registerContestants()
      expect(component.message).toEqual('Cannot add duplicate name')
    })
  })

  describe('trackByIndex', () => {
    it('should return the first argument, ignoring the second', () => {
      expect(component.trackByIndex(0, 'ignore me')).toBe(0)
      expect(component.trackByIndex(18, 'me too')).toBe(18)
    })
  })

  describe('autofill', () => {
    it('should fill the players with randomly selected names', () => {
      component.autofill(2, ['a', 'b'])
      expect(component.players.sort()).toEqual(['', '', '', '', '', '', 'a', 'b'])

      component.autofill(4, ['a', 'b', 'c', 'd'])
      expect(component.players.sort()).toEqual(['', '', '', '', 'a', 'b', 'c', 'd'])

      component.autofill(8, ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])
      expect(component.players.sort()).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])
    })

    it('should fill the rest of players with empty strings', () => {
      component.autofill(2)
      expect(component.players.slice(2)).toEqual(new Array(6).fill(''))

      component.autofill(4)
      expect(component.players.slice(4)).toEqual(new Array(4).fill(''))

      component.autofill(8)
      component.players.every((value: string) => expect(value).not.toEqual(''))
    })
  })
})
