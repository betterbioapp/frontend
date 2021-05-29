import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../profile.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: any | undefined;
  links: any[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    const username: string | null = this.route.snapshot.paramMap.get('username');
    this.profileService.findOne(username).subscribe((profile: any) => {
      console.log(profile);
      this.profile = profile;
    });

    this.profileService.findLinks(username).subscribe((links: any[]) => {
      console.log(links);
      this.links = links;
    })
  }

}
