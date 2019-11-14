import {Component, Input, OnInit, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import {ItemModel} from '../../models/item-model';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnChanges, OnInit {
  imgName = '';
  description = '';
  itemName = '';
  owlLength: number;
  wallLength: number;
  caseLength: number;
  items: ItemModel[] = [];
  item: ItemModel;
  @Input() name: string;
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const name: SimpleChange = changes.name;
    if (name.currentValue === '') {
      this.setDefault();
    }
    if (name.currentValue === 'Owls') {
      this.setOwls();
    }
    if (name.currentValue === 'Wallpapers') {
      this.setWallpapers();
    }
    if (name.currentValue === 'Cases') {
      this.setCases();
    }
  }

  ngOnInit() {
  }
  setDefault(): void {
    this.items = [];
    this.wallLength = 0;
    this.owlLength = 0;
    this.caseLength = 0;
    for (let i = 0; i < 20; i++) {
      if (i % 2 === 0 && i % 3 !== 0) {
        this.imgName = '/../../assets/owl.jpg';
        this.description = 'Owl owl owl owl';
        this.itemName = 'Owl';
        this.item = new ItemModel(this.imgName, this.itemName, this.description, '24.99$');
        this.items.push(this.item);
        this.owlLength++;
      }
      if (i % 2 !== 0 && i % 3 !== 0) {
        this.imgName = '/../../assets/first.jpg';
        this.description = 'Phone case phone case phone case';
        this.itemName = 'Phone case';
        this.item = new ItemModel(this.imgName, this.itemName, this.description, '9.99$');
        this.items.push(this.item);
        this.caseLength++;
      }
      if (i % 3 === 0) {
        this.imgName = '/../../assets/wall.jpg';
        this.description = 'Wallpaper wallpaper wallpaper';
        this.itemName = 'Wallpaper';
        this.item = new ItemModel(this.imgName, this.itemName, this.description, '14.99$');
        this.items.push(this.item);
        this.wallLength++;
      }
    }
  }
  setOwls(): void {
    this.items = [];
    for (let i = 0; i < this.owlLength; i++) {
      this.imgName = '/../../assets/owl.jpg';
      this.description = 'Owl owl owl owl';
      this.itemName = 'Owl';
      this.item = new ItemModel(this.imgName, this.itemName, this.description, '24.99$');
      this.items.push(this.item);
    }
  }
  setWallpapers(): void {
    this.items = [];
    for (let i = 0; i < this.wallLength; i++) {
      this.imgName = '/../../assets/wall.jpg';
      this.description = 'Wallpaper wallpaper wallpaper';
      this.itemName = 'Wallpaper';
      this.item = new ItemModel(this.imgName, this.itemName, this.description, '14.99$');
      this.items.push(this.item);
    }
  }
  setCases(): void {
    this.items = [];
    for (let i = 0; i < this.caseLength; i++) {
      this.imgName = '/../../assets/first.jpg';
      this.description = 'Phone case phone case phone case';
      this.itemName = 'Phone case';
      this.item = new ItemModel(this.imgName, this.itemName, this.description, '9.99$');
      this.items.push(this.item);
    }
  }
  alertTest(): void {
    alert(this.name);
  }
}
