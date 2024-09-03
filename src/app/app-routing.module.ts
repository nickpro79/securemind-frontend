import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { LoginpageComponent } from './Components/loginpage/loginpage.component';
import { PagenotfoundComponent } from './Components/pagenotfound/pagenotfound.component';
import { RegisterpageComponent } from './Components/registerpage/registerpage.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  {path:'login', component:LoginpageComponent},
  {path:'register',component:RegisterpageComponent},
  {path:'**',component:PagenotfoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
