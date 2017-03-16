import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { ProfileModel } from '../models/ProfileModel';
import * as _ from 'lodash';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrls: ['./profiles-list.component.css']
})
export class ProfilesListComponent implements OnInit {
  private profiles:any;
  constructor(private  profileService:ProfileService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.profiles = this.profileService.getAllResolver.map(
      (data)=>{
        let newArr=[];
        _.forEach(data, (value) =>{
          newArr.push(new ProfileModel(value))
        });
        return newArr;
      }
    );

  }

}
