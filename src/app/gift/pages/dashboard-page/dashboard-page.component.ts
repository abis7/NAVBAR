import { Component, signal } from '@angular/core'; // Importa signal
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true, // Asegúrate de que standalone es true
  imports: [
    CommonModule, // Necesario para [ngClass] y @if
    RouterOutlet, 
    SideMenuComponent
  ],
  templateUrl: './dashboard-page.component.html',
})
export default class DashboardPageComponent {
  
  // Signal para controlar el estado del menú en móvil
  public isMenuOpen = signal(false);

  // Función para abrir/cerrar el menú
  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }
}