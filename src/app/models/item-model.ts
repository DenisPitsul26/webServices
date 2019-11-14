export class ItemModel {
  constructor(public img: string,
              public itemName: string,
              public description: string,
              public price: string,
              public id?: number) {}
}
