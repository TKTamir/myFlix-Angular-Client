// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialog } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

//This import is used to import Angulars Router
import { Router } from '@angular/router';

// Importing EditProfile Component
import { EditProfileComponent } from '../edit-profile/edit-profile.component';


@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
    ) { }
  ngOnInit(): void {
    this.getUser(); // Fire the get user function when the component has loaded
  }

  // Function to get the user data from the api via fetchApiData
  getUser(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.user = response;
      console.log(this.user);
      return this.user;
    });
  }

  // Function to open the dialog and allow the user to edit their profile details
  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: '300px',
    });
  }

  // Function to delet user profile
  deleteProfile(): void {
    if (
      confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'

      )
    ) { //Navigate user back to welcome after deleting the user
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          'You have successfully deleted your account!',
          'OK',
          {
            duration: 2000,
          }
        );
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }

}
