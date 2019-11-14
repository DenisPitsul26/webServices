import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import {of as observableOf, Subscription} from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import { files } from './example-data';
import {CategoryService} from '../../services/category.service';
import {Categories} from '../../models/categories';
import {Category} from '../../models/category';

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
  name: string;
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
  private categories: Categories;
  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<FlatTreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<Category, FlatTreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<Category, FlatTreeNode>;

  constructor(private categoryService: CategoryService) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);

    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    // this.dataSource.data = this.categories.results;
  }

  ngOnInit(): void {
    this.sub1 = this.categoryService.getCategories().subscribe((data: Categories) => {
      this.categories = data;
      console.log(this.categories);
      // console.log(this.categories.results[0].category_name);
      // console.log(this.categories.results[0].children);

      this.dataSource.data = this.categories.results;
    });
  }

  /** Transform the data to something the tree can read. */
  transformer(node: Category, level: number) {
    return {
      name: node.name,
      // type: node.type,
      level,
      expandable: !!node.children
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
    return observableOf(node.children);
  }

  click(name: string) {
    // console.log(name);
    this.name.emit(name);
    this.sub2 = this.categoryService.getSubCategoriesByName(name).subscribe((data: Categories) => {
      console.log(data);
    });
  }

  ngOnDestroy(): void {
    if (this.sub1 != null) {
      this.sub1.unsubscribe();
    }
    if (this.sub2 != null) {
      this.sub2.unsubscribe();
    }
  }
}
