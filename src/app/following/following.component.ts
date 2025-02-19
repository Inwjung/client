import { Component, inject, OnInit, WritableSignal } from '@angular/core'
import { default_pageSizeOption, Paginator, UserQueryPagination } from '../_helper/Pagination'
import { User } from '../_models/user'
import { LikeService } from '../_services/like.service'
import { MemberCardComponent } from '../member/member-card/member-card.component'
import { MatIcon } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { MatExpansionModule } from '@angular/material/expansion'
import { FormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'

@Component({
  selector: 'app-following',
  imports: [MemberCardComponent, MatIcon, MatSelectModule, MatButtonModule, MatPaginatorModule, MatExpansionModule, FormsModule, MatInputModule, MatFormFieldModule
  ],
  templateUrl: './following.component.html',
  styleUrl: './following.component.scss'
})
export class FollowingComponent implements OnInit {
  private likeService = inject(LikeService)
  following: WritableSignal<Paginator<UserQueryPagination, User>>
  pageSize = default_pageSizeOption

  constructor() {
    this.following = this.likeService.following
  }
  async onSearvh() {
    this.likeService.getFollowing()
  }
  ngOnInit(): void {
    this.onSearvh()
  }
  onResetsearch() {
    this.following.set(deefault_paginator)
    this.onSearvh()
  }
  onPageChange(event: PageEvent) {
    const copyPagimator = this.following()
    copyPagimator.pagination.currentPage = event.pageIndex + 1
    copyPagimator.pagination.pageSize = event.pageSize
    this.following.set(copyPagimator)

    this.onSearvh()
  }
}
