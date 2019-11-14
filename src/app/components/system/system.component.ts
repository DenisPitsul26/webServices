import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit {
  private opened = false;
  name = '';
  modalAdd: any;
  constructor() {}

  ngOnInit() {
    this.modalAdd = (document.getElementById('myModalApp') as HTMLDialogElement);
    this.modalAdd.style.display = 'block';
  }

  private _toggleSidebar() {
    this.opened = !this.opened;
  }
  private changeFilter(name: string) {
    this.name = name;
    console.log(this.name);
  }
  private clear() {
    this.name = '';
  }
}
