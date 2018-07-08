import { Component, AfterViewInit, Input, OnDestroy } from '@angular/core';
import Winwheel from 'Winwheel';
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

  private unsubscribe$: Subject<void> = new Subject<void>();

  wheelSpinning = false;
  wheelFinished = false;

  @Input() users: any;
  numOfUsers: number;

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
        'duration': 5,
        'spins': 4,
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
        this.wheel.draw();
        this.wheelFinished = true;
      }, 5100);
    }
  }

  // -------------------------------------------------------
  // Function for reset button.
  // -------------------------------------------------------
  resetWheel() {
    this.wheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
    this.wheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
    this.wheel.segments[this.winningNumber].fillStyle = this.winningColor;
    this.winningPerson = '';
    this.wheel.draw();                // Call draw to render changes to the wheel.
    this.wheelSpinning = false; 
    this.wheelFinished = false;         // Reset to false to power buttons and spin can be clicked again.
  }

  closeWheel() {
    this.gameService.closeGame();
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
    this.unsubscribe$.next();
  }

}
