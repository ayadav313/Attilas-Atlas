import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {TreeNode} from 'primeng/api';
import { NodeService } from '../nodeservice';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})

export class DirectoryComponent implements OnInit{
  buildings!: TreeNode[];
  selectedLocation :string = "";


  constructor(private nodeService: NodeService, private router : Router) { }

  ngOnInit() {
      //this.nodeService.getBuildings().then(files => this.buildings = files);

      // this.nodeService.getBuildings().subscribe(
      //   files => this.buildings = files
      // );

      const buildingsObserver = {
        next: (files: TreeNode[]) => this.buildings = files,
        error: (error: any) => console.error(error)
      };

      this.nodeService.getBuildings().subscribe(buildingsObserver);
  }

  nodeSelect(event : any){
    console.log(event.node);
    this.router.navigate(['/home'], { state: {building : [event.node]}})
  }
}
