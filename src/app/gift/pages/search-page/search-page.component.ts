import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { Gif } from '../../interfaces/giphy-response.interface';
import { ApiGiphyService } from '../../services/apiGiphy.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-search-page',
  imports: [NgFor],
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPageComponent {
  @ViewChild('txtQuery') txtQuery!: ElementRef<HTMLInputElement>;
  gifs: Gif[] = [];

  constructor(private giphy: ApiGiphyService) {
    // Cargar trending al inicio
    this.loadTrending();
  }

  loadTrending() {
    this.giphy.getTrendingGifs().subscribe({
      next: (results: Gif[]) => this.gifs = results,
      error: (err) => console.error('Error trending', err),
    });
  }

  onSearch(event?: Event) {
    if (event) event.preventDefault();
    const query = this.txtQuery.nativeElement.value.trim();

    if (!query) {
      this.loadTrending();
    } else {
      this.giphy.searchGifs(query).subscribe({
        next: (results: Gif[]) => this.gifs = results,
        error: (err) => console.error('Error buscando GIFs', err),
      });
    }
  }
}
