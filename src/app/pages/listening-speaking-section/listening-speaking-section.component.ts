import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
import MicRecorder from 'mic-recorder-to-mp3';
import * as RecordRTC from 'recordrtc';

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

  constructor(
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
        // For test only, remove it after test
        if (!this.currentQuestion.audioUri) {
          this.examSectionSets[this.currentSetIndex].startSetQuestion = true;
          // this.currentQuestion.audioUri = 'https://res.cloudinary.com/kallisprep/video/upload/v1605906299/audios/uefa_cl_kxhgpj.mp3';
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
    if (!currentQuestion.recorder) {
      // New instance
      const recorder = new MicRecorder({
        bitRate: 128
      });

      currentQuestion.recorder = recorder;
    }

    // Start recording. Browser will request permission to use your microphone.
    currentQuestion.recorder.start().then(() => {
      // something else
    }).catch((e) => {
      console.error(e);
    });
  }

  pauseAudioRecording(currentQuestion): void {
    currentQuestion.recordingPause = true;
    // currentQuestion.recorder.pause();
  }

  resumeAudioRecording(currentQuestion): void {
    currentQuestion.recordingPause = false;
  }

  stopAudioRecording(currentQuestion): void {
    currentQuestion.recordingStart = false;
    currentQuestion.recorder.stop().getMp3().then(([buffer, blob]) => {
      console.log(buffer, blob);
      const file = new File(buffer, 'music.mp3', {
        type: blob.type,
        lastModified: Date.now()
      });

      const player = new Audio(URL.createObjectURL(file));
      currentQuestion.audioPlayRef = player;
    }).catch((e) => {
      console.error(e);
    });
  }

  uploadAudio(currentQuestion): void {

  }

  removeAudio(currentQuestion): void {
    currentQuestion.recordingPause = false;
    currentQuestion.recordingStart = false;
    currentQuestion.audioPlayRef = null;
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
