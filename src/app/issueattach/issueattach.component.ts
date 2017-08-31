import { Component, OnInit } from '@angular/core';
import { UploadService } from '../shared/user/upload.service';
import { IssueAttachService } from '../shared/issue/issue-attach.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-issueattach',
  templateUrl: './issueattach.component.html',
  styleUrls: ['./issueattach.component.css'],
  providers: [UploadService, IssueAttachService]
})
export class IssueattachComponent implements OnInit {

  private filesToUpload = [];
  private imgUrl = '';
  private id: string = "";
  private fileData;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private uploadService: UploadService, private IssueAttachService: IssueAttachService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.listFile(this.id);
      }
    });
  }

  fileChangeEvent(fileInput) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  onAttach() {
    this.upload();
  }

  onDelete(index) {
    this.IssueAttachService.removeFile(this.id, this.fileData).subscribe((res) => {
      this.router.navigate(['support', 'issuelist']);
    });
  }

  onShowImage(index) {
    window.open(`${environment.apiUrl}/issue/view-attach/${this.id}/${this.fileData[index]}`);
  }

  upload() {
    console.log(this.filesToUpload);
    if (this.filesToUpload.length > 0) {
      this.uploadService.makeFileRequest(
        "attach",
        environment.apiUrl + "/issue/attach/" + this.id,
        [], this.filesToUpload).subscribe((res) => {
          this.router.navigate(['support', 'issuelist']);
        });
    } else {
      this.router.navigate(['support', 'issuelist']);
    }
  }

  listFile(id) {
    this.IssueAttachService.listFile(id).subscribe((data) => {
      this.fileData = data;
      console.log(this.fileData);
    });
  }

}
