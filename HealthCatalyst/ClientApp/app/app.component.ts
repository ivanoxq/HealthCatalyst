import { CatPhoto } from './Models/CatPhoto';
import { APIService } from './Controllers/API.service';
import { Patient } from './Models/Patient';
import { PatientService } from './Controllers/patient.service';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef} from 'ngx-bootstrap'
import { SearchService } from './Services/Search.service';
import { RandomProfile } from './Models/RandomProfile';
import { NotifierService } from 'angular-notifier';
import { ErrorService } from './Services/Error.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  @ViewChild('template') private addPatientTemplate:TemplateRef<any>;
  public modalRef: BsModalRef | null;

  public showGridSpinner = false;
  public showInputSpinner = false;

  private readonly notifier: NotifierService;

  constructor(private modalService: BsModalService,
              private patientService: PatientService,
              private searchService: SearchService,
              private apiService: APIService,
              private notifierService: NotifierService,
              private errorService: ErrorService) {
      
      this.notifier = this.notifierService;

      this.errorService.error.subscribe((error: string) => {
        this.notifier.notify('error', error);
      });
    }

  public GridSpinnerChange = (value:boolean) => {
    this.showGridSpinner = value;
  }
  
  public AddPatient = () => {
    this.modalRef = this.modalService.show(this.addPatientTemplate, { ignoreBackdropClick: true });
  }

  public AddRandomPatient = (badCall: boolean) => {
    this.showInputSpinner = true;
    this.apiService.GetRandomProfile().subscribe(x => {
      this.apiService.GetRandomCatInfo().subscribe(y => {
        const profile = x as RandomProfile;
        this.SubmitRandomPatient(profile, y[0], badCall);
      },
      (error) => {
        this.errorService.Error(`Issue Calling Cats API:\n${error.message}`);
      });
    },
    (error) => {
      this.errorService.Error(`Issue Calling Random Profile API:\n${error.message}`);
    });
  }

  public SearchPatient = (pattern: string) => {
    this.searchService.CurrentPattern = pattern; 
    this.patientService.SearchPatients({
      SearchPattern: pattern
    }).subscribe((result: Patient[]) => {
      
      this.searchService.SetPatients(result);
    },
    (error) => {
      this.errorService.Error(`Issue Calling Search Patient API:\n${error.message}`);
    });
  }

  public SubmitRandomPatient(profile: RandomProfile, cat: CatPhoto, badCall: boolean)
  {
    this.showInputSpinner = true;
    const genProfile = profile.profile;

    const patient: Patient = {
      FirstName: badCall ? '' : genProfile.firstName,
      LastName: genProfile.surname,
      Age: genProfile.age,
      DOB: genProfile.birthday,
      Gender: genProfile.gender,
      Communication: {
        Address: genProfile.address,
        Country: genProfile.country,
        Email: genProfile.email,
        Phone: genProfile.phone,
        Zip: genProfile.zipCode
      },
      Description: {
        Interest: genProfile.occupation,
        Characteristics:`SSN: ${genProfile.ssNumber}, Passport: ${genProfile.passportNumber}`
      },
      Image: {
        ImageCodeBase64: ''
      }
    }
    
    this.toDataUrl(cat.url, (myBase64) => {
        patient.Image.ImageCodeBase64 = myBase64;
        this.insertPatient(patient);
    });
  }

  public onSubmit = (patient:Patient): void => {
    if (patient)
    {
      this.insertPatient(patient);
    }

    if(this.modalRef)
    {
      this.modalRef.hide();
    }
  }

  public onCancel = (event:any): void => {
    if(this.modalRef)
    {
      this.modalRef.hide();
    }
  }

  public searchStarted = (event:boolean): void => {
    this.showGridSpinner = event;
  }

  private insertPatient(patient: Patient) {

    this.patientService.InsertPatient(patient).subscribe((p) => {
      console.log(p);
      this.searchStarted(true);
      this.SearchPatient(this.searchService.CurrentPattern);
      this.showInputSpinner = false;
      this.notifier.notify( 'success', `Patient ${patient.FirstName} ${patient.LastName} was added.`);
    },
    (error) => {
      this.showInputSpinner = false;
      this.errorService.error.next(`Issue Calling Insert Patient API:\n${error.message}`);
    })
  }

  private toDataUrl(url, callback) {
    const file = this.apiService.GetRandomCatImage(url).subscribe(x => callback(x));
  }
}
