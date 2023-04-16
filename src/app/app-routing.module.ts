import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { GaragemComponent } from './components/garagem/garagem.component';
import { MensalistasComponent } from './components/mensalistas/mensalistas.component';
import { SobreComponent } from './components/sobre/sobre.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: NavComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'garagem', component: GaragemComponent },
      { path: 'mensalistas', component: MensalistasComponent },
      { path: 'sobre', component: SobreComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
