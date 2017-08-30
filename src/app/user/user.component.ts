import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user/user';
import { UserService } from '../user.service';
import { UploadService } from '../shared/user/upload.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService, UploadService]
})
export class UserComponent implements OnInit {

  user: User;
  mode: string = "ADD";
  id: string = "";
  filesToUpload = [];
  imgUrl = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private uploadService: UploadService
  ) {
    this.user = new User();
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        let id = params['id'];
        this.userService.findById(id).subscribe(
          user => {
            console.log(user);
            this.user = user[0];
            this.imgUrl = `${environment.apiUrl}/user/profile/${id}`;
          }, error => {
            console.log(error);
          });
        this.mode = "EDIT";
        this.id = id;
      }
    });
  }

  onSave() {
    if (this.mode === "EDIT") {
      console.log(this.user);
      this.userService.updateItem(this.id, this.user).subscribe(
        data => {
          Materialize.toast('update complete.', 1000);
          this.upload();
          this.router.navigate(['support', 'userlist']);
        },
        err => {
          console.log(err);
        }
      )
    } else {
      console.log(this.user);
      this.userService.addItem(this.user).subscribe(
        datas => {
          this.id = datas._id;
          Materialize.toast('save complete.', 1000);
          this.upload();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  fileChangeEvent(fileInput) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event) => {
        this.imgUrl = event.target["result"];
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  upload() {
    console.log(this.filesToUpload);
    if (this.filesToUpload.length > 0) {
      this.uploadService.makeFileRequest(
        "avatar",
        environment.apiUrl + "/user/profile/" + this.id,
        [], this.filesToUpload).subscribe((res) => {
          this.router.navigate(['support', 'userlist']);
        });
    } else {
      this.router.navigate(['support', 'userlist']);
    }

  }
}
