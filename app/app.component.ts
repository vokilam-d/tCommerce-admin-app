import { Component, OnInit } from '@angular/core';
import { AuthService } from '~/services/auth.service';

@Component({
  selector: 'ns-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  text: string = '';
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    console.log('init');
    this.authService.getUser().subscribe(
      response => {
        console.log('response')
        console.log(response);
        this.text = JSON.stringify(response);
      },
      error => {
        console.log('error');
        console.log(error);
      }
    )
  }
}
