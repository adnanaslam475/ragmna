import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../customer.service';
@Component({
  selector: 'app-pay-process',
  templateUrl: './pay-process.component.html',
  styleUrls: ['./pay-process.component.css'],
})
export class PayProcessComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private custservice: CustomerService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (Object.keys(params).length > 0) {
        if (params?.['status'] == 'paid') {
          let _reqbody = {
            statusCd: params?.['status'],
            ispaid: 1,
            transId: params?.['id'],
            respMsg: params?.['message'],
          };
          this.updatePaymentStatus(_reqbody, true);
        } else {
          let _reqbody = {
            statusCd: params?.['status'] ?? 'failed',
            ispaid: 0,
            transId: params?.['id'],
            respMsg: params?.['message'],
          };
          this.toastr.error(params?.['message'], 'payment failed', {
            timeOut: 5000,
            positionClass: 'toast-top-full-width',
          });
          this.updatePaymentStatus(_reqbody, false);
        }
      } else {
        this.toastr.error('Invalid URL access');
      }
    });
  }
  updatePaymentStatus(postData: any, ispaid: boolean) {
    this.custservice.savePayStatus(postData).subscribe((data: any) => {
      if (data.success) {
        if (ispaid) {
          this.toastr.success('payment completed successfully');
          this.router.navigate(['/']);
        } else {
          this.toastr.error('payment is not completed');
        }
      }else {
        this.toastr.error('payment is not completed');
      }
    });
  }
}
