import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, NgModule, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent { 
   @Output() search = new EventEmitter<string>();
  query = '';

  submit() {
    const value = (this.query ?? '').trim();
    if (!value) return;
    this.search.emit(value);
  }

  clear() {
    this.query = '';
    this.search.emit(''); // opcional: notificar clear
  }
}
