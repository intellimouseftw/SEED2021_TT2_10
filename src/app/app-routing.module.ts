import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TransferComponent } from './transfer/transfer.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { GraphComponent } from './tools/graph/graph.component';




const routes: Routes = [
  {path: 'profile', component: UserProfileComponent},
  {path: '', component: UserProfileComponent},
  {path: 'transactionhistory', component: GraphComponent},
  {path: 'transfer', component: TransferComponent },
  // {path: 'balance', component: null },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = []