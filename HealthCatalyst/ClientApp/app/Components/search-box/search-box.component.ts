import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { timer } from 'rxjs'

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  @Output() onSearch = new EventEmitter<string>();
  @Output() showSpinner = new EventEmitter<boolean>();

  private timerStarted = false;
  public boxSize = "200";

  constructor() { }

  ngOnInit() {
  }

  public onKey(event: any) {
    
    if (!this.timerStarted) {
      this.timerStarted = true;
      console.log('emitting...');
      this.showSpinner.emit(true);
      this.oberserableTimer(event);
    }
  }

  public onfocus(event: any) {
    this.boxSize = "300";
  }

  public onfocusout(event: any) {
    this.boxSize = "200";
  }

  private oberserableTimer(event: any) {
    const source = timer(4000);
    source.subscribe(val => {
      this.timerStarted = false;
      console.log('Fire Timer');
      this.onSearch.emit(event.target.value);
    });
  }
}