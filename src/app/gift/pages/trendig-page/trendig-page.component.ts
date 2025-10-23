import { ChangeDetectionStrategy, inject, Component, OnInit } from '@angular/core';
import { ApiGiphyService } from '../../services/apiGiphy.service';
import { ResultComponentComponent } from "../../components/result-component.component/result-component.component";

@Component({
  selector: 'app-trendig-page',
  imports: [ResultComponentComponent],
  templateUrl: './trendig-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendigPageComponent implements OnInit {
  // Hacemos 'public' el servicio para usar sus señales en el template.
  public readonly api = inject(ApiGiphyService);

  // ¡No necesitamos 'ChangeDetectorRef' ni 'effect'!
  // Las señales se encargarán de la detección de cambios.

  ngOnInit(): void {
    this.loadTrendingGifs();
  }

  private loadTrendingGifs(): void {
    console.log('Se estan cargando los gifs trending');
    
    // Suponemos que 'getTrendingGifs' actualiza las señales
    // (isLoading, gifs, error) DENTRO del servicio.
    //
    // Por lo tanto, solo necesitamos "activar" la llamada HTTP 
    // con .subscribe(). No necesitamos hacer nada en 'next' 
    // porque el template leerá las señales actualizadas.
    this.api.getTrendingGifs({ limit: 100 }).subscribe({
      error: (error) => {
        // El servicio ya debería haber puesto el error en su señal,
        // pero podemos loguearlo aquí si es necesario.
        console.error('Error en la suscripción de trending GIFs:', error);
      }
    });
  }
 }
