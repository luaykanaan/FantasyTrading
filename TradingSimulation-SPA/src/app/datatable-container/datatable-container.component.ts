import { Component, OnInit, ViewChild } from '@angular/core';
import { Trade } from '../_models/trade';
import { UserService } from '../_services/user.service';
import { MatPaginator, MatTableDataSource, MatSort, MatRipple } from '@angular/material';

@Component({
  selector: 'app-datatable-container',
  templateUrl: './datatable-container.component.html',
  styleUrls: ['./datatable-container.component.css']
})
export class DatatableContainerComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatRipple) ripple: MatRipple;
  // tableDataSource: Trade[];
  tableDataSource = new MatTableDataSource<Trade>();
  displayedColumns: string[] = ['id', 'created', 'direction', 'resource', 'quantity', 'rate', 'tradeTotal'];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.setDataTableSource();
  }

  setDataTableSource() {
    this.userService.loggedInUserWalletsAndTradesInfo$.subscribe(
      response => {
        this.tableDataSource.data = response.trades;
        this.tableDataSource.paginator = this.paginator;
        this.tableDataSource.sort = this.sort;
        if (this.tableDataSource.data.length > 0) {
          this.ripple.launch({centered: true, color: 'rgba(103, 58, 183, 0.3)'});
        }
      }
    );
  }

}
