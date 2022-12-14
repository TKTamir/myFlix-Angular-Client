// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

//This import is used to import Angulars Router
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
// Input decorator
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
    ) { }
    

  ngOnInit(): void {
  }

/**
 *  Function sends the form inputs to the backend by using fetchApiData
 *  When login is successful reroute the user to /movies endpoint
 * @function loginUser
 */
loginUser(): void {
  this.fetchApiData.userLogin(this.userData).subscribe((response) => {
    localStorage.setItem('user', response.user.Username);
    localStorage.setItem('token', response.token);
// Logic for a successful user registration goes here! (To be implemented)
   this.dialogRef.close(); // This will close the modal on success!
   this.snackBar.open('You have successfully logged in.', 'OK', {
      duration: 2000
   });
   this.router.navigate(['movies']);
    }, (response) => {
    this.snackBar.open(response, 'OK', {
      duration: 2000
    });
  });
}
}
