import { Component } from '@angular/core';
import { MyService } from './my.service';
import { BackendService } from './backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MyService, BackendService]
})
export class AppComponent {
  title = 'app';
  recent: any;

  constructor(
	private myService: MyService,
  private backendService: BackendService) {
		this.title = "Earthquakes past Week 4.5+ Mag";
	}
    ngOnInit() { 
        this.getEarthquakes(); 
    }

    getEarthquakes() {

      this.recent = this.backendService.invoke('https://jsonplaceholder.typicode.com/posts', 'Get', null, null)
      .subscribe(
        result => {
          //this.recent = result.features;
          console.log('request-1::'+result);
        }
      );
      this.recent = this.backendService.invoke('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson', 'Get', null, null)
      .subscribe(
        result => {
          //this.recent = result.features;
          console.log('request-2::'+result);
        }
      );
      this.recent = this.backendService.invoke('https://jsonplaceholder.typicode.com/posts', 'Get', null, null)
      .subscribe(
        result => {
          //this.recent = result.features;
          console.log('request-3::'+result);
        }
      );

//https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson
//http://www.fakeresponse.com/api/?sleep=5

      //   this.myService.getRecentEarthquakes()
			// .subscribe(
      //           recent => this.recent = recent);
                
      //   this.myService.getRecentEarthquakes()
			// .subscribe(
      //           recent => this.recent = recent);

	}
}
