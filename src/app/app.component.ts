import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-text-search-highlight';
  searchText = '';
  characters = [
    'Sort Result',
    'Sort by Name A-Z',
    'Sort by Name Z-A',
  ]

  onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
}
}
