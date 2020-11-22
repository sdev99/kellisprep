import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmModalComponent} from '../../modals/confirm-modal/confirm-modal.component';
import {EnumService} from '../../services/enum.service';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';
import {AccountService} from '../../services/account.service';
import {ApiService} from '../../services/api.service';
import {AlertService} from '../../services/alert.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ShareddataService} from '../../services/shareddata.service';
import {UtilService} from '../../services/util.service';
import * as RecordRTC from 'recordrtc';
import {HttpClient} from '@angular/common/http';
import CryptoJS from 'crypto-js';

@Component({
  selector: 'app-listening-speaking-section',
  templateUrl: './listening-speaking-section.component.html',
  styleUrls: ['./listening-speaking-section.component.scss']
})
export class ListeningSpeakingSectionComponent implements OnInit {
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  Math = Math;
  UtilService = UtilService;

  environment = environment;
  EnumService = EnumService;

  currentSetIndex = 0;
  currentIndex = 0;
  currentQuestion;

  maxMessageLength = 250;
  submitted = false;

  itemDetail;
  examSessionData;
  examSectionSets;
  pathsTree = [];

  isVideoPlaying = false;


  unixtime;


  constructor(
    private ngZone: NgZone,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private apiService: ApiService,
    private alertService: AlertService,
    private shareddataService: ShareddataService,
    private utilService: UtilService,
    public dialog: MatDialog,
    private cookieService: CookieService,
    private http: HttpClient,
  ) {

    const item = cookieService.get(EnumService.cookieNames.CURRENT_EXAM_SESSION);
    const examData = localStorage.getItem(EnumService.localStorageKeys.CURRENT_EXAM_SESSION_DATA);

    if (item) {
      this.itemDetail = JSON.parse(item);
      this.pathsTree = [this.itemDetail.type, this.itemDetail.name, 'Listening Section'];
    }

    if (examData) {
      // {"examSectionId":17,"sessionId":"b34ab0e5-ec3e-4c13-9ae5-556a9f07439c","examTypeId":1,"examTypeText":"SAT","title":"SAT-EXAM-01","description":"<p>SAT-EXAM-01</p>","duration":null,"sectionData":{"id":1,"name":"Reading","guideline":null,"sets":[{"id":2,"orderNo":1,"passage":" ","videoUri":null,"videoRepeatable":false,"questions":[{"id":1,"typeId":1,"text":"<p>q1x</p>","imageUri":"/medialibrary/image/worldmap.jpg","orderNo":0,"weight":1.00,"choices":[{"id":1,"text":"c1x","imageUri":null},{"id":2,"text":"c2x","imageUri":null},{"id":3,"text":"c3x","imageUri":null},{"id":4,"text":"c4x","imageUri":null}],"groups":[],"items":[]},{"id":10,"typeId":1,"text":" ","imageUri":null,"orderNo":1,"weight":1.00,"choices":[],"groups":[],"items":[]},{"id":12,"typeId":1,"text":" ","imageUri":null,"orderNo":2,"weight":1.00,"choices":[],"groups":[],"items":[]},{"id":17,"typeId":1,"text":"<p>aaaa</p>","imageUri":null,"orderNo":3,"weight":1.00,"choices":[{"id":20,"text":"cc1","imageUri":null},{"id":21,"text":"cc2","imageUri":null},{"id":22,"text":"cc3","imageUri":null},{"id":23,"text":"cc4","imageUri":null}],"groups":[],"items":[]},{"id":18,"typeId":1,"text":" ","imageUri":null,"orderNo":4,"weight":1.00,"choices":[],"groups":[],"items":[]},{"id":19,"typeId":1,"text":" ","imageUri":null,"orderNo":5,"weight":1.00,"choices":[],"groups":[],"items":[]},{"id":22,"typeId":1,"text":"<p>bbbb</p>","imageUri":null,"orderNo":6,"weight":1.00,"choices":[{"id":24,"text":"bc1","imageUri":null},{"id":25,"text":"bc2","imageUri":null},{"id":26,"text":"bc3","imageUri":null}],"groups":[],"items":[]},{"id":23,"typeId":1,"text":" ","imageUri":null,"orderNo":7,"weight":1.00,"choices":[],"groups":[],"items":[]}]}]},"isSuccess":true,"exception":null,"messages":["OK"]}
      this.examSessionData = JSON.parse(examData);
      this.examSectionSets = this.examSessionData.sectionData?.sets;
      this.examSectionSets.map((set) => {
        set.questions.map((question) => {
          if (question.typeId === EnumService.examQuestionTypes.DRAG_DROP) {
            question.groups.map((group) => {
              group.answered = [];
            });
          }
        });
      });


      if (this.examSectionSets && this.examSectionSets.length > this.currentSetIndex) {
        if (this.examSectionSets[this.currentSetIndex].questions.length > this.currentIndex) {
          this.currentQuestion = this.examSectionSets[this.currentSetIndex].questions[this.currentIndex];
        }
      }
    }
  }

  ngOnInit(): void {
    if (!(this.examSessionData.sectionData && (this.examSessionData.sectionData.name === EnumService.examSectionTypes.LISTENING || this.examSessionData.sectionData.name === EnumService.examSectionTypes.SPEAKING))) {
      this.location.back();
    }
  }

  // PLay Audio
  playAudio(currentQuestion): void {
    let audioPlay: HTMLAudioElement = currentQuestion.audioPlayRef;
    if (!currentQuestion.audioPlayRef) {
      audioPlay = new Audio(currentQuestion.audioUri);
    }
    currentQuestion.playing = true;

    audioPlay.play().then(() => {
      currentQuestion.audioPlayRef = audioPlay;
      currentQuestion.audioPlayTimer = setInterval(() => {
        currentQuestion.currentTime = currentQuestion.audioPlayRef.currentTime;
      }, 1000);
    });

    audioPlay.onended = () => {
      this.stopAudio(currentQuestion);
    };
  }

  stopAudio(currentQuestion): void {
    currentQuestion.playing = false;
    if (currentQuestion.audioPlayRef) {
      currentQuestion.audioPlayRef.pause();
      currentQuestion.audioPlayRef.currentTime = 0;
      clearInterval(currentQuestion.audioPlayTimer);
    }
  }

  currentValueOfProgressBar(): number {
    if (this.currentQuestion.audioPlayRef) {
      const time = this.currentQuestion.audioPlayRef.currentTime;
      const duration = this.currentQuestion.audioPlayRef.duration;
      return (Math.round(time) / Math.round(duration));
    }
    return 0;
  }


  // End -- PLay Audio

  // Record audio
  startRecording(currentQuestion): void {
    currentQuestion.recordingStart = true;
    currentQuestion.recordingDuration = 0;

    if (!currentQuestion.recorder) {
      navigator.mediaDevices.getUserMedia({
        audio: true
      }).then(async (stream) => {
        currentQuestion.stream = stream;
        const recorder = RecordRTC(stream, {
          type: 'audio',
          mimeType: 'audio/webm'
        });
        currentQuestion.recorder = recorder;
        currentQuestion.recorder.startRecording();
        this.startRecordingTimer(currentQuestion);
      });
    } else {
      currentQuestion.recorder.startRecording();
      this.startRecordingTimer(currentQuestion);
    }
  }

  startRecordingTimer(currentQuestion): void {
    currentQuestion.recordingTimer = setInterval(() => {
      this.ngZone.run(() => {
        if (currentQuestion.recordingDuration >= 60) {
          this.stopAudioRecording(currentQuestion);
        }
        currentQuestion.recordingDuration = currentQuestion.recordingDuration + 1;
      });
    }, 1000);
  }

  stopRecordingTimer(currentQuestion): void {
    if (currentQuestion.recordingTimer) {
      clearInterval(currentQuestion.recordingTimer);
      currentQuestion.recordingTimer = null;
    }
  }

  pauseAudioRecording(currentQuestion): void {
    this.ngZone.run(() => {
      currentQuestion.recordingPause = true;
      currentQuestion.recorder.pauseRecording();
      this.stopRecordingTimer(currentQuestion);
    });
  }

  resumeAudioRecording(currentQuestion): void {
    this.ngZone.run(() => {
      currentQuestion.recordingPause = false;
      currentQuestion.recorder.resumeRecording();
      this.startRecordingTimer(currentQuestion);
    });
  }

  stopAudioRecording(currentQuestion): void {
    currentQuestion.recordingStart = false;
    this.stopRecordingTimer(currentQuestion);

    currentQuestion.recorder.stopRecording((blobURL) => {
      const blob = currentQuestion.recorder.getBlob();
      this.stopMedia(currentQuestion);
      const mp3Name = this.audioFileName();
      // const file = {blob, title: mp3Name};
      const file = new File([blob], mp3Name);
      currentQuestion.audioFile = file;
      const player = new Audio(blobURL);
      player.load();
      this.ngZone.run(() => {
        currentQuestion.audioPlayRef = player;
      });
    });
  }

  private stopMedia(currentQuestion): void {
    if (currentQuestion.recorder) {
      currentQuestion.recorder = null;
      if (currentQuestion.stream) {
        currentQuestion.stream.getAudioTracks().forEach(track => track.stop());
        currentQuestion.stream = null;
      }
    }
  }

  private audioFileName(): string {
    if (this.examSessionData && this.currentQuestion) {
      return this.examSessionData.sessionId + '+' + this.currentQuestion.id + '.mp3';
    }
    return Date.now() + '.mp3';
  }

  private generateSignature(): string {
    const publicId = this.audioFileName(); // I like to make it unique.
    // tslint:disable-next-line:no-bitwise
    this.unixtime = Date.now() / 1000 | 0;
    return CryptoJS.SHA1(`folder=${'audioresponses'}&public_id=${publicId}&timestamp=${this.unixtime}${environment.cloudnarySecretKey}`).toString();
  }


  uploadAudio(currentQuestion): void {
    const publicId = this.audioFileName();

// Split the filename to get the name and type
    const file = currentQuestion.audioFile;
    if (!file.name) {
      file.name = this.audioFileName();
    }
    // let fileParts = file.name.split('.');
    // let fileName = fileParts[0];
    // let fileType = fileParts[1];

    const cloudName = environment.cloudnaryCloudName;
    const uploadUrl = 'https://cors-anywhere.herokuapp.com/' + 'https://api.cloudinary.com/v1_1/' + cloudName + '/upload';

    const signature = this.generateSignature();

    const data = new FormData();
    // data.append('upload_preset', environment.cloudnaryUploadPreset);
    data.append('file', file);
    data.append('folder', environment.cloudnaryAudioFolder);
    data.append('public_id', publicId);
    data.append('api_key', environment.cloudnaryApiKey);
    data.append('signature', signature);
    data.append('timestamp', this.unixtime.toString());

    this.shareddataService.startLoading();
    this.http.post(uploadUrl, data).subscribe((response: any) => {
      this.shareddataService.stopLoading();
      const url = response.url;
      const resPublicId = response.public_id;
      // const asset_id = response.data.asset_id;
      currentQuestion.answerInput = url;
    }, (error) => {
      this.shareddataService.stopLoading();
      console.log('Error ', error);
    });
  }

  removeAudio(currentQuestion): void {
    // currentQuestion.recordingPause = false;
    // currentQuestion.recordingStart = false;
    // currentQuestion.audioPlayRef = null;
  }

  // End --- Record audio

  // Video Play
  shouldVideoClipPlay = () => {
    if (this.examSectionSets && this.examSectionSets.length > this.currentSetIndex) {
      const currentSet = this.examSectionSets[this.currentSetIndex];
      if (currentSet.videoUri && !currentSet.startSetQuestion) {
        return true;
      }
    }
    return false;
  };

  playVideo(event: any): void {
    this.isVideoPlaying = true;
    this.videoplayer.nativeElement.play();
  }

  videoEnd(event: any): void {
    if (this.examSectionSets && this.examSectionSets.length > this.currentSetIndex) {
      const currentSet = this.examSectionSets[this.currentSetIndex];
      if (!currentSet.videoRepeatable) {
        currentSet.startSetQuestion = true;
        this.isVideoPlaying = false;
      }
    }
  }

  // End-- Video Play

  startSetQuestion(): void {
    if (this.examSectionSets && this.examSectionSets.length > this.currentSetIndex) {
      const currentSet = this.examSectionSets[this.currentSetIndex];
      currentSet.startSetQuestion = true;
      this.isVideoPlaying = false;
      this.videoplayer.nativeElement.pause();
    }
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }


  singleChoiceItemSelect(item, subItem): void {
    item.choices.map((choice) => {
      choice.selected = false;
    });
    subItem.selected = true;
  }


  finishSection = () => {
    if (this.currentSetIndex < this.examSectionSets.length - 1) {
      this.currentSetIndex++;
      this.currentIndex = 0;
      this.currentQuestion = this.examSectionSets[this.currentSetIndex].questions[this.currentIndex];
    } else {
      this.openDialog();
    }
  };

  openDialog(): void {

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      id: 'confirmdialog',
      disableClose: true,
      role: 'dialog',
      data: {
        title: 'Are you sure you want to finish this section?',
        message: 'You will not be able to return later to double-check or change your answers if you finish this section. Are you sure you are done checking your work?',
        leftBtnTitle: 'No, go back to question 1',
        rightBtnTitle: 'Yes I am done'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.shareddataService.endExamSession(this.examSectionSets);
      } else {
        this.currentSetIndex = 0;
        this.currentIndex = 0;
      }
    });

  }

  onBack(): void {
    this.location.back();
  }

  shouldEnableNextButton(): boolean {
    if (this.examSessionData.sectionData.name === EnumService.examSectionTypes.SPEAKING) {
      if (this.currentQuestion && this.currentQuestion.answerInput) {
        return true;
      }
      return false;
    }
    return true;
  }

  onPrevious(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentQuestion = this.examSectionSets[this.currentSetIndex].questions[this.currentIndex];
    }
  }

  onNext(): void {
    if (this.currentIndex < (this.examSectionSets[this.currentSetIndex].questions.length - 1)) {
      this.currentIndex++;
      this.currentQuestion = this.examSectionSets[this.currentSetIndex].questions[this.currentIndex];
    }
  }

}
