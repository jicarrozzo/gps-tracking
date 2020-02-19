import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		loadChildren: () => import('./pages/home/home.module').then((m) => m.HomePageModule)
	},
  {
    path: 'map-view',
    loadChildren: () => import('./pages/map-view/map-view.module').then( m => m.MapViewPageModule)
  },
  {
    path: 'track-list',
    loadChildren: () => import('./pages/track-list/track-list.module').then( m => m.TrackListPageModule)
  }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
