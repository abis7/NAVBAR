import { ChangeDetectionStrategy, Component } from '@angular/core';

interface MenuItem {
  nombre: string;
  ruta: string;
  description: string;
  active: boolean;  

}

//para el perfil
@Component({
  selector: 'app-gifs-side-menu-header',
  imports: [],
  templateUrl: './gifs-side-menu-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsSideMenuHeaderComponent { 




  
  
}
