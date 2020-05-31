import { Component, ElementRef, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Application, Graphics } from 'pixi.js';

@Component({
  selector: 'grid',
  template: '',
})
export class GridComponent implements OnInit  {
  public app: Application;

  @Input()
  public devicePixelRatio = window.devicePixelRatio || 1;

  blueprintDark = 0x002082;
  blueprintLight = 0xCeD8F7;
  blueprintDraw = 0xFFFFFF;

  margin = 10;
  cellSize = 25;
  gridWidth = 20;
  gridHeight = 10;

  constructor(private elementRef: ElementRef, private ngZone: NgZone) {}

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.app = new Application({
        width: this.width(),
        height: this.height(),
      });
    });
    this.elementRef.nativeElement.appendChild(this.app.view);

    this.app.stage.addChild(this.drawGrid());
  }

  ngOnDestroy(): void {
    this.app.destroy();
  }

  private width(): number {
    return this.margin * 2 + this.gridWidth * this.cellSize;
  }

  private height(): number {
    return this.margin * 2 + this.gridHeight * this.cellSize;
  }

  drawGrid(): Graphics {
    const graphics = new Graphics();

    graphics.beginFill(this.blueprintDark);
    graphics.drawRect(0, 0, this.width(), this.height());
    graphics.endFill();

    const top = this.margin;
    const left = this.margin;
    const bottom = top + this.gridHeight * this.cellSize;
    const right = left + this.gridWidth * this.cellSize;
    graphics.lineStyle(1, this.blueprintLight, 1);
    for (let i = left; i <= right; i += this.cellSize) {
      graphics.moveTo(i, top);
      graphics.lineTo(i, bottom);
    }
    for (let j = top; j <= bottom; j += this.cellSize) {
      graphics.moveTo(left, j);
      graphics.lineTo(right, j);
    }
    graphics.closePath();
    graphics.endFill();
    return graphics
  }
}
