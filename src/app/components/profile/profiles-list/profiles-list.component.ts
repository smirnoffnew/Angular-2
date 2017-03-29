import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProfileService } from '../../../core/services/profile.service';
import { ProfileModel } from '../../../models/ProfileModel';
import * as _ from 'lodash';

@Component({
  selector: 'app-profiles-list',
  templateUrl: 'profiles-list.component.html',
  styleUrls: ['profiles-list.component.css']
})

export class ProfilesListComponent implements OnInit {
  private profiles:any;

  constructor(private  profileService:ProfileService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.profiles = this.profileService.getProfilesList$.map(
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
