import { Component, OnInit, ViewChildren } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Isignin } from 'src/app/@core/shared/Isignup';
import { ROUTER_UTILS } from '../../../../@core/utils/router.utils';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { setItem, StorageItem } from 'src/app/@core/utils';

@Component({
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.css'],
})
export class SignInPage implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
