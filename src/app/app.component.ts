import { Component } from '@angular/core';
import { BackendService } from './backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BackendService]
})
export class AppComponent {
  title = 'app';
  recent: any;
  req1status=false;
  req2status=false;
  req3status=false;

  constructor(private backendService: BackendService) {
		this.title = "Sequential http requests demo";
	}
    ngOnInit() { 
        this.getEarthquakes(); 
    }

    getEarthquakes() {

      this.recent = this.backendService.invoke('https://jsonplaceholder.typicode.com/posts', 'Get', null, null)
      .subscribe(
        result => {
          //this.recent = result.features;
          this.req1status=true;
          console.log('request-1::'+result);
        }
      );
      this.recent = this.backendService.invoke('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson', 'Get', null, null)
      .subscribe(
        result => {
          //this.recent = result.features;
          this.req2status=true;
          console.log('request-2::'+result);
        }
      );
      this.recent = this.backendService.invoke('https://jsonplaceholder.typicode.com/posts', 'Get', null, null)
      .subscribe(
        result => {
          //this.recent = result.features;
          this.req3status=true;
          console.log('request-3::'+result);
        }
      );

	}
}
