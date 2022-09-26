import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor( private router: Router) {}

  ngOnInit(): void {}
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    // this.authService.signOut();

    // this.router.navigate(['/auth/sign-in'], {
    //   clearHistory: true,
    // } as NavigationExtras);
    location.reload();
  }
}
