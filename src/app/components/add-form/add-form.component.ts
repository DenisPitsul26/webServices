import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  selectedFile: File;
  imgURL: any;
  constructor() { }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];

  }

  onUpload() {
    // upload code goes here
  }
}
