import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { JuegoVotacionesPage } from './juego-votaciones.page';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material';
import { MatButtonModule, MatCardModule, MatToolbarModule } from '@angular/material';
import { MdePopoverModule } from '@material-extended/mde';
import { MatListModule } from '@angular/material/list'; 
import { MatInputModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: JuegoVotacionesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatFormFieldModule,
    MatTableModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    MdePopoverModule,
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    RouterModule.forChild(routes)
  ],
  declarations: [JuegoVotacionesPage]
})
export class JuegoVotacionesPageModule {}
