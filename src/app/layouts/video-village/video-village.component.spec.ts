import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoVillageComponent } from './video-village.component';

describe('VideoVillageComponent', () => {
  let component: VideoVillageComponent;
  let fixture: ComponentFixture<VideoVillageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoVillageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoVillageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
