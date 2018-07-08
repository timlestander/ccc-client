import { Component, AfterViewInit, Input, OnDestroy } from '@angular/core';
import Winwheel from 'winwheel';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-random-game',
  templateUrl: './random-game.component.html',
  styleUrls: ['./random-game.component.scss']
})
export class RandomGameComponent implements AfterViewInit, OnDestroy {
  wheel;
  timer;
  endTimer;

  private unsubscribe$: Subject<void> = new Subject<void>();

  wheelSpinning = false;
  wheelFinished = false;
  endOfGame = false;
  spinSpeed = 5;
  numOfSpins = 4;
  resetText = 'Trotsa bödeln!';
  message = 'Den bödeln utser är:';

  @Input() users: any;
  numOfUsers: number;

  @Input()
  public set elimination(value: boolean) {
    this._elimination = value;
    if (value) {
      this.message = 'Bödeln väljer att skona:';
      this.spinSpeed = 1;
      this.numOfSpins = 1;
    }
  }
  public get elimination(): boolean { return this._elimination; }
  private _elimination: boolean = false;

  winningPerson: string = '';
  winningNumber: number;
  winningColor: any;

  constructor(private gameService: GameService) {
  }

  ngAfterViewInit() {
    // this.initWheel();
    this.users.pipe(takeUntil(this.unsubscribe$)).subscribe(users => {
      const length = users.length;
      const segments = this.getSegments(users);
      this.numOfUsers = length;

      this.initWheel({
        'numOfUsers': length,
        'segments': segments
      });
    });
  }

  initWheel(userData) {
    this.wheel = new Winwheel({
      'canvasId'        : 'spinwheel',
      'outerRadius'     : 150,
      'textFontSize'    : 18,
      'textAlignment'   : 'outer',
      'numSegments'     : userData.numOfUsers,
      'lineWidth'   : 3,
      'pointerAngle': 40,
      'segments': userData.segments,
      'textFillStyle': '#ffffff',
      'strokeStyle': '#ffffff',
      'pointerGuide' :        // Turn pointer guide on.
      {
          'display'     : true,
          'strokeStyle' : 'rgba(0,0,0,0.2)',
          'lineWidth'   : 3
      },
      'animation':           // Define spin to stop animation.
      {
        'type': 'spinToStop',
        'duration': this.spinSpeed,
        'spins': this.numOfSpins,
      }
    });
  }

  private drawHand() {
    const handImage = new Image();
    handImage.src = '../../../assets/pointing_hand.png';

    handImage.onload = function() {
      const wheelCanvas = <HTMLCanvasElement> document.getElementById('spinwheel');
      const ctx = wheelCanvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(handImage, 255, 100, 100, 50);
      }
    };
  }

  private getSegments(users) {
    function getRandomColor(index) {
      // const letters = '0123456789ABCDEF';
      // let color = '#';
      // for (let i = 0; i < 6; i++) {
      //   color += letters[Math.floor(Math.random() * 16)];
      // }
      // return color;

      const color1 = '#f08080';
      const color2 = '#6f86d6';

      if (index % 2) {
        return color1;
      } else {
        return color2;
      }
    }

    const array = [];
    users.forEach((user, index) => {
      array.push({'fillStyle': getRandomColor(index), 'text': user.username});
    });
    return array;
  }

  // -------------------------------------------------------
  // Click handler for spin button.
  // -------------------------------------------------------
  startSpin() {
    // Ensure that spinning can't be clicked again while already running.
    if (this.wheelSpinning === false) {
      this.wheel.startAnimation();
      this.wheelSpinning = true;
      this.timer = setTimeout(() => {
        this.drawHand();
        this.winningPerson = this.wheel.getIndicatedSegment().text;
        this.winningNumber = this.wheel.getIndicatedSegmentNumber();
        this.winningColor = this.wheel.segments[this.winningNumber].fillStyle;
        this.wheel.segments[this.winningNumber].fillStyle = 'green';
        if (this.elimination) {
          this.resetText = 'Fortsätt';
          if (this.numOfUsers === 3) {
            this.spinSpeed = 5;
            this.numOfSpins = 3;
            this.wheel.animation.duration = this.spinSpeed;
            this.wheel.animation.spins = this.numOfSpins;
          }
          if (this.numOfUsers === 2) {
            this.endOfGame = true;
            this.spinSpeed = 1;
            this.numOfSpins = 1;
            this.wheel.animation.duration = this.spinSpeed;
            this.wheel.animation.spins = this.numOfSpins;
            this.endTimer = setTimeout(() => {
              this.message = 'Bödeln slaktar alltså:';
              this.resetWheel();
            }, 1000);
          }
        }
        this.wheel.draw();
        this.wheelFinished = true;
      }, this.spinSpeed * 1000 + 100);
    }
  }

  // -------------------------------------------------------
  // Function for reset button.
  // -------------------------------------------------------
  resetWheel() {
    this.wheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
    this.wheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
    this.wheel.segments[this.winningNumber].fillStyle = this.winningColor;
    if (this.elimination) {
      this.wheel.deleteSegment(this.winningNumber);
      this.numOfUsers--;
    }
    this.winningPerson = '';
    this.wheel.draw();                // Call draw to render changes to the wheel.
    this.wheelSpinning = false;
    this.wheelFinished = false;         // Reset to false to power buttons and spin can be clicked again.
    this.startSpin();
  }

  closeWheel() {
    this.gameService.closeGame();
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
    clearTimeout(this.endTimer);
    this.unsubscribe$.next();
  }
}
