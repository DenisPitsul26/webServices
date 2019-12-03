import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {from, interval, Observable, of, of as observableOf, Subscription, timer} from 'rxjs';
import {FlatTreeControl} from '@angular/cdk/tree';
import {files} from './example-data';
import {CategoryService} from '../../services/category.service';
import {Categories} from '../../models/categories';
import {Category} from '../../models/category';
import {log} from 'util';
import {debounce, debounceTime, delay, flatMap, map, mergeMap, take, tap, timeout} from 'rxjs/operators';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

/** File node data with possible child nodes. */
// export interface FileNode {
//   name: string;
//   type: string;
//   children?: FileNode[];
// }

/**
 * Flattened tree node that has been created from a FileNode through the flattener. Flattened
 * nodes include level index and whether they can be expanded or not.
 */
export interface FlatTreeNode {
  // name: string;
  category: Category;
  // type: string;
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'app-my-tree',
  templateUrl: './my-tree.component.html',
  styleUrls: ['./my-tree.component.css']
})
export class MyTreeComponent implements OnInit, OnDestroy {
  @Output() name = new EventEmitter<string>();
  private sub1: Subscription;
  private sub2: Subscription;
  private sub3: Subscription;
  private categories: Categories;
  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<FlatTreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<Category, FlatTreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<Category, FlatTreeNode>;
  private flag = false;
  private jsonURL = 'assets/categories.json';

  constructor(private categoryService: CategoryService, private http: HttpClient) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);

    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    // this.dataSource.data = this.categories.results;
    this.categoryService.getJSON(this.jsonURL).subscribe(data => {
      console.log(data);
      this.categories = data;
      this.dataSource.data = this.categories.results;
    }, (rej) => {
          console.error('Could not load local data', rej);
    });
  }

  // start2() {
  //   console.log('st 2');
  //   this.listCategory.forEach(e => {
  //     if (e.num_children > 0) {
  //       this.getSecondLevel(e.name);
  //     }
  //   });
  // }

  ngOnInit(): void {

    // this.getFirstLevel();


    // if (!this.flag) {
    //   this.sub1 = this.categoryService.getCategories().subscribe((data: Categories) => {
    //     this.categories = data;
    //     console.log('all categories', this.categories);
    //     this.categories.results.forEach(c => {
    //       c.tag1 = c.name;
    //     });
    //     // this.getSecondLevel('art');
    //     // this.getThirdLevel('art', 'sculpture');
    //     this.dataSource.data = this.categories.results;
    //     this.flag = true;
    //   });
    // }

    // this.getFirstLevel();
    // this.getAllData();
  }

  /** Transform the data to something the tree can read. */
  transformer(node: Category, level: number) {
    return {
      category: node,
      // type: node.type,
      level,
      expandable: !!node.categories
    };
  }

  /** Get the level of the node */
  getLevel(node: FlatTreeNode) {
    return node.level;
  }

  /** Get whether the node is expanded or not. */
  isExpandable(node: FlatTreeNode) {
    return node.expandable;
  }

  /** Get whether the node has children or not. */
  hasChild(index: number, node: FlatTreeNode) {
    return node.expandable;
  }

  /** Get the children for the node. */
  getChildren(node: Category) {

    return observableOf(node.categories.results);
  }

  clickOnCategory(node: FlatTreeNode) {
    console.log(node.category.name);
  }

  // getFirstLevel() {
  //   this.sub1 = this.categoryService.getCategories().subscribe((data: Categories) => {
  //     data.results.forEach(e => {
  //       if (e.num_children > 0) {
  //         this.listCategory.push({name: e.name, num_children: e.num_children,  children: []});
  //       }
  //     });
  //   });
  // }

  // getSecondLevel(nameLevelSecond: string) {
  //   this.sub2 = this.categoryService.getSubCategoriesByName(nameLevelSecond).subscribe(
  //     (data: Categories) => {
  //       // console.log(data);
  //       // console.log(this.listCategory.find(e => e.nama === nameLevelSecond));
  //       // this.listCategory.forEach(e => {
  //       //   if (e.num_children > 0) {
  //       //     // console.log('f', e.name);
  //       //     this.getThirdLevel(nameLevelSecond, e.name);
  //       //   }
  //       // });
  //
  //       // const index = this.categories.results.findIndex(c => c.name === nameLevelSecond);
  //       // this.categories.results[index].children = data;
  //       // this.dataSource.data = this.categories.results;
  //       // this.categories.results[index].children.results.forEach(e => {
  //       //   if (e.num_children > 0) {
  //       //     // console.log('f', e.name);
  //       //     this.getThirdLevel(nameLevelSecond, e.name);
  //       //   }
  //       // });
  //
  //
  //       // this.getThirdLevel('art', 'reproduction');
  //     });
  // }

  // getThirdLevel(nameLevelSecond: string, nameLevelThird: string) {
  //   this.sub3 = this.categoryService.getSubSubCategoriesByName(nameLevelSecond, nameLevelThird).subscribe(
  //     (data: Categories) => {
  //       console.log('      3', data);
  //       const index1 = this.categories.results.findIndex(c => c.name === nameLevelSecond);
  //       const index2 = this.categories.results[index1].children.results.findIndex(c => c.name === nameLevelThird);
  //
  //       this.categories.results[index1].children.results[index2].children = data;
  //       // this.dataSource.data = this.categories.results;
  //     });
  // }

  ngOnDestroy(): void {
    if (this.sub1 != null) {
      this.sub1.unsubscribe();
    }
    if (this.sub2 != null) {
      this.sub2.unsubscribe();
    }
    if (this.sub3 != null) {
      this.sub2.unsubscribe();
    }
  }

  // private getAllData(): void {
  //   this.categoryService.getCategories().toPromise()
  //     .then(res => {
  //       let result = res.results; // перший рівень
  //       result = result.map((item, index) => {
  //         setTimeout(async () => {
  //           const cats = await this.getNames(item.name); // другий рівень
  //           cats.results.map(async (cat, indexCat) => {
  //             if (cat.num_children) {
  //               setTimeout(async () => {
  //                 const dogs = await this.getHuys(item.name, cat.name); // третій рівень
  //
  //               }, indexCat * 1000);
  //             }
  //           });
  //         }, 500 * index);
  //       });
  //     });
  // }
  //
  // private async getNames(name: string): Promise<Array<any>> {
  //   return await this.categoryService.getSubCategoriesByName(name).toPromise();
  // }
  //
  // private async getHuys(name, other): Promise<any> {
  //   return await this.categoryService.getSubSubCategoriesByName(name, other).toPromise();
  // }
}
