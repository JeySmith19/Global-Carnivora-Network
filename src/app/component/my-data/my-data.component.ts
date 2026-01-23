import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/model/security/userdata';
import { MydataService } from 'src/app/service/mydata.service';

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.css']
})
export class MyDataComponent implements OnInit {

  user: UserData = new UserData();
  loading: boolean = true;
  error: string = '';

  constructor(private mydataService: MydataService) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    this.loading = true;
    this.mydataService.getMyData().subscribe({
      next: (data) => {
        this.user = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
      }
    });
  }
}
