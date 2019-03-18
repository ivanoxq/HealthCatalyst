import { Component, OnInit, Input, OnChanges, SimpleChanges, HostListener, EventEmitter, Output } from '@angular/core';
import { SearchService } from 'ClientApp/app/Services/Search.service';
import { Patient } from 'ClientApp/app/Models/Patient';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-flex-grid',
  templateUrl: './flex-grid.component.html',
  styleUrls: ['./flex-grid.component.css']
})
export class FlexGridComponent implements OnInit, OnChanges {

  private patientBufferNextIndex = 0;
  private patientsBuffer: Patient[];
  public patients: Patient[];

  @Output() SpinnerAction = new EventEmitter<boolean>();
  @Output() ClickAddButton = new EventEmitter<any>();
  @Output() GenerateRandom = new EventEmitter<any>();

  @Input() public ShowDataSpinner = false;
  @Input() public ShowInputSpinner = false;

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (this.patientsBuffer && this.bottomReached()) {
      for(let lcv = 0; lcv < 9 && this.patientBufferNextIndex < this.patientsBuffer.length; lcv++ ) {
        this.patients.push(this.patientsBuffer[this.patientBufferNextIndex++]);
      }
    } else if (this.patientsBuffer && this.topReached()) {
      this.patients = [];
      this.patientBufferNextIndex = 0;

      if (this.patientsBuffer) {

        for(let lcv = 0; lcv < 9 && this.patientBufferNextIndex < this.patientsBuffer.length; lcv++ ) {
          this.patients.push(this.patientsBuffer[this.patientBufferNextIndex++]);
        }

      } else {
        this.patients = this.patientsBuffer;
      }
    }
  }

  constructor(private searchService: SearchService,
              private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    const $patients = this.searchService.GetPatients();

    $patients.subscribe(p => {
      this.SpinnerAction.emit(false);
      this.patientBufferNextIndex = 0;
      this.patientsBuffer = p;
      this.patients = [];

      if (this.patientsBuffer) {

        for(let lcv = 0; lcv < 9 && this.patientBufferNextIndex < this.patientsBuffer.length; lcv++ ) {
          this.patients.push(this.patientsBuffer[this.patientBufferNextIndex++]);
        }

      } else {
        this.patients = this.patientsBuffer;
      }
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  public clickAdd()
  {
    this.ClickAddButton.emit();
  }

  public clickGenerate(badCall: boolean)
  {
    this.GenerateRandom.emit(badCall);
  }

  public sanatizeImage(base64: string): any {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
                 + base64);
  }

  private bottomReached(): boolean {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 3;
  }

  private topReached(): boolean {
    return window.scrollY == 0;
  }
}