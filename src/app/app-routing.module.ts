import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  // {path: 'profile', component: null},
  // {path: 'transactionhistory', component: null},
  // {path: 'transfer', component: null },
  // {path: 'balance', component: null },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = []