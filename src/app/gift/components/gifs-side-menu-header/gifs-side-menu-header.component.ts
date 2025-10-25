import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '@environments/environment';

interface MenuItem {
  nombre: string;
  ruta: string;
  description: string;
  active: boolean;  

}

@Component({
  selector: 'app-gifs-side-menu-header',
  imports: [],
  templateUrl: './gifs-side-menu-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsSideMenuHeaderComponent { 


envs= environment;

  
  
}
