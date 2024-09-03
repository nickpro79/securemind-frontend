import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginpageComponent } from './Components/loginpage/loginpage.component';
import { PagenotfoundComponent } from './Components/pagenotfound/pagenotfound.component';
import { RegisterpageComponent } from './Components/registerpage/registerpage.component';

const routes: Routes = [
  {path:'login', component:LoginpageComponent},
  {path:'register',component:RegisterpageComponent},
  {path:'**',component:PagenotfoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
