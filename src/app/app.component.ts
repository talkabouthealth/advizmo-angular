import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'finance-app';
  public access_token: string;
  ngOnInit() {

  }
  ngOnDestroy() {

  }
  onPlaidSuccess($event: any) {
    console.log('onPlaidSuccess executed');
    console.log($event, '$event');
    if ($event !== undefined && $event.token !==undefined) {
      this.access_token = $event.token;
      console.log(this.access_token, 'access_token');
      // Call Backend API sending access token
    } 
  }
  onPlaidExit($event: any) {
    console.log('onPlaidExit executed');
  }
  onPlaidLoad($event: any) {
    console.log('onPlaidLoad executed');
  }
  onPlaidEvent($event: any) {
    console.log('onPlaidEvent executed');
  }
  onPlaidClick($event: any) {
    console.log('onPlaidClick executed');
  }
}
