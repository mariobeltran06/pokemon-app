import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { SvgIconComponent } from 'src/app/shared/components/svg-icon/svg-icon.component';
import { selectFinishState } from 'src/app/store/selectors/pokemon.selector';
import { selectAllProfile } from 'src/app/store/selectors/profile.selector';
import { IAppState } from 'src/app/store/states/app.state';
import { IInfoProfileState } from 'src/app/store/states/profile.state';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';

@UntilDestroy()
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, SvgIconComponent, ButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  nameCoach: string | null = 'Mario';
  finished: boolean = false;

  constructor(private store: Store<IAppState>) {
    this.store
      .select(selectAllProfile)
      .pipe(untilDestroyed(this))
      .subscribe((profile: IInfoProfileState) => {
        if (profile.name) {
          this.nameCoach = profile.name;
        }
      });
    this.store
      .select(selectFinishState)
      .pipe(untilDestroyed(this))
      .subscribe((finish: boolean) => {
        this.finished = finish;
      });
  }

  open(): void {
    console.log(this.nameCoach);
  }
}
