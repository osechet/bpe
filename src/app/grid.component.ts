import { Component, ElementRef, HostListener, Input, NgZone, OnDestroy, AfterViewInit } from '@angular/core';
import { Application, Container, Graphics } from 'pixi.js';

@Component({
  selector: 'grid',
  template: '',
  styleUrls: [ './grid.component.css' ]
})
export class GridComponent implements AfterViewInit  {
  public app: Application;

  @Input()
  public devicePixelRatio = window.devicePixelRatio || 1;

  private layers = new Map<string, Container>();

  blueprintDark = 0x002082;
  blueprintLight = 0xCeD8F7;
  blueprintDraw = 0xFFFFFF;

  margin = 10;
  cellSize = 25;
  gridHorzSize = 20;
  gridVertSize = 10;

  constructor(private elementRef: ElementRef, private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.app = new Application({transparent: true});
    });
    this.elementRef.nativeElement.appendChild(this.app.view);

    this.resize();
  }

  ngOnDestroy(): void {
    this.app.destroy();
  }

  @HostListener('window:resize')
  public resize() {
    const width = this.elementRef.nativeElement.offsetWidth;
    const height = this.elementRef.nativeElement.offsetHeight;
    const viewportScale = 1 / this.devicePixelRatio;
    this.app.renderer.resize(width * this.devicePixelRatio, height * this.devicePixelRatio);

    const gridLayer = new Container();
    this.app.stage.addChild(gridLayer);
    this.layers.set('grid', gridLayer);

    this.drawGrid();
  }

  drawGrid() {
    const layer = this.layers.get('grid');
    layer.removeChildren();

    const width = this.elementRef.nativeElement.offsetWidth;
    const height = this.elementRef.nativeElement.offsetHeight;

    const gridWidth = this.margin * 2 + this.gridHorzSize * this.cellSize;
    const gridHeight = this.margin * 2 + this.gridVertSize * this.cellSize;

    const top = (height - gridHeight) / 2;
    const left = (width - gridWidth) / 2;
    layer.setTransform(left, top);

    const graphics = new Graphics();
    layer.addChild(graphics);

    graphics.beginFill(this.blueprintDark);
    graphics.drawRect(0, 0, gridWidth, gridHeight);
    graphics.endFill();

    const gridTop = this.margin;
    const gridLeft = this.margin;
    const gridBottom = gridTop + this.gridVertSize * this.cellSize;
    const gridRight = gridLeft + this.gridHorzSize * this.cellSize;
    graphics.lineStyle(1, this.blueprintLight, 1);
    for (let i = gridLeft; i <= gridRight; i += this.cellSize) {
      graphics.moveTo(i, gridTop);
      graphics.lineTo(i, gridBottom);
    }
    for (let j = gridTop; j <= gridBottom; j += this.cellSize) {
      graphics.moveTo(gridLeft, j);
      graphics.lineTo(gridRight, j);
    }
    graphics.closePath();
    graphics.endFill();
  }
}
