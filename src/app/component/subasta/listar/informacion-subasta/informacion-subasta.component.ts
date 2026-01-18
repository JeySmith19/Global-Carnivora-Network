import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subasta } from 'src/app/model/subasta';

@Component({
  selector: 'app-informacion-subasta',
  templateUrl: './informacion-subasta.component.html',
  styleUrls: ['./informacion-subasta.component.css']
})
export class InformacionSubastaComponent implements OnInit {

  subasta!: Subasta;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const state = history.state;
    if (state.subasta) {
      this.subasta = state.subasta;
    }
  }

}
