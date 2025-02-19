import { Component, inject, input, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LikeService } from '../../_services/like.service';
import { cacheManager } from '../../_helper/cache';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-member-card',
  imports: [MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss'
})
export class MemberCardComponent implements OnInit {
  likeService = inject(LikeService)
  member = input.required<User>()
  // memberR = input.required<User[]>()
  // isFollowing = false

  ngOnInit(): void {
    const member = this.member()
    if (!member) return;
    // const memberR = this.memberR
    // console.log(this.memberR())

    this.member().isFollowing = this.likeService.IsFollowingMember(this.member().id!)
  }

  toggleLike() {
    if (this.member()) {
      // this.likeService.toggleLike(this.member().id!)
      // this.isFollowing = !this.isFollowing
      this.member().isFollowing = this.likeService.toggleLike(this.member().id!)
      cacheManager.clear('all')
    } else {
      return;
    }
  }
}
