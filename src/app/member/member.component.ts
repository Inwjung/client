import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { MemberService } from '../_services/member.service'
import { default_pageSizeOption, default_paginator, Paginator, UserQueryPagination } from '../_helper/Pagination'
import { User } from '../_models/user'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion'
import { FormsModule } from '@angular/forms'
import { MatSelectModule } from '@angular/material/select'
import { MemberCardComponent } from './member-card/member-card.component'
// import { MatIconModule } from '@angular/material/icon';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { CdkAccordionModule } from '@angular/cdk/accordion';

@Component({
  selector: 'app-member',
  // imports: [MatPaginatorModule, MatExpansionModule, MatIconModule, MatFormFieldModule, CdkAccordionModule],
  imports: [MemberCardComponent, MatPaginatorModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatExpansionPanel,
    FormsModule, MatFormFieldModule,
    MatButtonModule, MatSelectModule,
  ],
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class MemberComponent implements OnInit {
  private memberService = inject(MemberService)
  paginator: WritableSignal<Paginator<UserQueryPagination, User>>
  pageSize = default_pageSizeOption


  constructor() {
    this.paginator = this.memberService.pagaintor
  }
  ngOnInit(): void {
    this.memberService.getMembers()
  }

  onPageChange(event: PageEvent) {
    const copyPaginator = this.paginator()
    copyPaginator.pagination.currentPage = event.pageIndex + 1
    copyPaginator.pagination.pageSize = event.pageIndex
    this.paginator.set(copyPaginator)

    this.onsearch()
  }
  onsearch() {
    this.memberService.getMembers()
  }
  onResetSearch() {
    this.paginator.set(default_paginator)
    this.onsearch()
  }
}