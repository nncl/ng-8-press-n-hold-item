import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  results: any = [];
  totalSelected: number;

  constructor() {
    this.totalSelected = 0;
  }

  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      this.results.push({name: i, selected: 0});
    }
  }

  updateTotal() {
    this.totalSelected = this.results.filter(item => item.selected).length;
  }

  holdTime($event, item) {
    console.log('$event', $event);
    if ($event >= 300) {
      return item.selected = true;
    }
  }
}
