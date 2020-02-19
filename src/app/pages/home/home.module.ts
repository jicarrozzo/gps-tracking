import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ModalMapPageModule } from '../modal-map/modal-map.module';
import { ModalMapPage } from '../modal-map/modal-map.page';

@NgModule({
	entryComponents: [ ModalMapPage ],
	imports: [ CommonModule, FormsModule, IonicModule, HomePageRoutingModule, ModalMapPageModule ],
	declarations: [ HomePage ]
})
export class HomePageModule {}
