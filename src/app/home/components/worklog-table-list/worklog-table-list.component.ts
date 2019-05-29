import { Component, OnInit } from '@angular/core';
import { Worklog } from '@app/core/models/Worklog';
import { WorklogService } from '@app/core/services/worklog.service';

@Component({
  selector: 'app-worklog-table-list',
  templateUrl: './worklog-table-list.component.html',
  styleUrls: ['./worklog-table-list.component.scss']
})
export class WorklogTableListComponent implements OnInit {

  displayedColumns: string[] = ['date', 'in', 'out'];
  dataSource: Worklog[];

  constructor(private worklogService: WorklogService) {}

  ngOnInit() {
    this.worklogService.getWorklogs(2, null, '2019-02-18')
      .subscribe(
        data => {
          // this.dataSource = data;
        },
        error => {
          console.log(error);
        });
  }

}
