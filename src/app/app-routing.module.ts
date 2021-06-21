import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BracketsComponent } from './tournament/brackets/brackets.component'
import { HelloComponent } from './tournament/hello/hello.component'
import { RegistrationComponent } from './tournament/registration/registration.component'

const routes: Routes = [
  { path: '', redirectTo: '/hello', pathMatch: 'full' },
  { path: 'hello', component: HelloComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'brackets', component: BracketsComponent },
  { path: '**', redirectTo: '/hello' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
