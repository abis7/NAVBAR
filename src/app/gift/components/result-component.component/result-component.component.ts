import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gif } from '../../interfaces/giphy-response.interface';
import { GiftCardComponent } from '../gift-card.component/gift-card.component';

@Component({
  selector: 'app-result-component',
  standalone: true,
  imports: [CommonModule, GiftCardComponent],
  templateUrl: './result-component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultComponentComponent implements OnChanges {
  private readonly cdr = inject(ChangeDetectorRef);

  @Input() gifs: Gif[] = [];
  @Input() isLoading = false;
  @Input() error: string | null = null;
  @Input() searchTerm = '';
  @Input() pageSize = 16;

  private _currentPage = signal<number>(1);
  public readonly currentPage = this._currentPage.asReadonly();

  public readonly totalPages = computed(() =>
    Math.ceil(this.gifs.length / this.pageSize)
  );

  public readonly paginatedGifs = computed(() => {
    const start = (this._currentPage() - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.gifs.slice(start, end);
  });

  public readonly masonryColumns = computed(() => {
    const gifs = this.paginatedGifs();
    // 🔹 Columnas adaptativas según el ancho
    const screenWidth = window.innerWidth;
    let columnCount = 4;
    if (screenWidth < 640) columnCount = 2;
    else if (screenWidth < 1024) columnCount = 3;

    const columns: Gif[][] = Array.from({ length: columnCount }, () => []);
    const heights = Array.from({ length: columnCount }, () => 0);

    gifs.forEach((gif) => {
      const w = parseInt(gif.images?.fixed_width?.width || '1');
      const h = parseInt(gif.images?.fixed_width?.height || '1');
      const ratio = h / w;
      const estHeight = Math.min(250 * ratio, 320);
      const target = heights.indexOf(Math.min(...heights));
      columns[target].push(gif);
      heights[target] += estHeight + 16;
    });

    return columns;
  });

  public readonly pageNumbers = computed(() => {
    const total = this.totalPages();
    const current = this._currentPage();
    const pages: number[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else if (current <= 3) {
      pages.push(1, 2, 3, 4, -1, total);
    } else if (current >= total - 2) {
      pages.push(1, -1, total - 3, total - 2, total - 1, total);
    } else {
      pages.push(1, -1, current - 1, current, current + 1, -1, total);
    }

    return pages;
  });

  public readonly currentRange = computed(() => {
    const start = (this._currentPage() - 1) * this.pageSize + 1;
    const end = Math.min(this._currentPage() * this.pageSize, this.gifs.length);
    return { start, end, total: this.gifs.length };
  });

  public readonly hasPagination = computed(() => this.totalPages() > 1);

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this._currentPage.set(page);
      this.scrollToTop();
    }
  }

  previousPage(): void {
    const current = this._currentPage();
    if (current > 1) {
      this._currentPage.set(current - 1);
      this.scrollToTop();
    }
  }

  nextPage(): void {
    const current = this._currentPage();
    if (current < this.totalPages()) {
      this._currentPage.set(current + 1);
      this.scrollToTop();
    }
  }

  firstPage(): void {
    this._currentPage.set(1);
    this.scrollToTop();
  }

  lastPage(): void {
    this._currentPage.set(this.totalPages());
    this.scrollToTop();
  }

  get isFirstPage(): boolean {
    return this._currentPage() === 1;
  }

  get isLastPage(): boolean {
    return this._currentPage() === this.totalPages();
  }

  private scrollToTop(): void {
    if (window.scrollY > 150) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gifs'] && !changes['gifs'].firstChange) {
      this._currentPage.set(1);
      console.log('🔄 Paginación reiniciada');
      this.cdr.markForCheck();
    }

    if (changes['isLoading'] || changes['error'] || changes['searchTerm']) {
      this.cdr.markForCheck();
    }
  }

  get hasGifs(): boolean {
    return this.gifs.length > 0;
  }

  get showEmptyState(): boolean {
    return !this.isLoading && !this.hasGifs && !this.error;
  }

  get noResultsMessage(): string {
    return this.searchTerm
      ? `No se encontraron resultados para "${this.searchTerm}"`
      : 'No hay GIFs para mostrar';
  }

  trackByGifId(index: number, gif: Gif): string {
    return gif.id;
  }
}
