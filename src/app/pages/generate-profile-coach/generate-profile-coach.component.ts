import { ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, map, Observable, startWith } from 'rxjs';
import { CardProfileComponent } from 'src/app/components/card-profile/card-profile.component';
import { ACTIVITIES } from 'src/app/core/constants/activities.constant';
import { IInfoProfile } from 'src/app/core/interfaces/info-profile.interface';
import { PATTERN_NAMES } from 'src/app/core/utils/patterns';
import { validateDUI } from 'src/app/core/validators/validator-dui.validators';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { SvgIconComponent } from 'src/app/shared/components/svg-icon/svg-icon.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-generate-profile-coach',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    SvgIconComponent,
    CardProfileComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ButtonComponent,
  ],
  templateUrl: './generate-profile-coach.component.html',
  styleUrls: ['./generate-profile-coach.component.scss'],
})
export class GenerateProfileCoachComponent {
  formProfileCoach: FormGroup;
  separatorKeysCodes: number[] = [ENTER];
  filteredActivities: Observable<string[]>;
  activity: string | null = null;
  allActivities: string[] = ACTIVITIES;
  minDate: Date;
  maxDate: Date;
  age: number = 0;
  displayLabelDocument: string = 'Documento';
  validatorsDUI: ValidatorFn | ValidatorFn[] = [
    Validators.required,
    Validators.minLength(9),
    Validators.maxLength(10),
    validateDUI(),
  ];
  validatorsCarnet: ValidatorFn | ValidatorFn[] = [Validators.maxLength(10)];

  constructor(private formBuilder: FormBuilder) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    this.minDate = new Date(1900, 0, 1);
    this.maxDate = new Date(currentYear - 1, currentMonth, currentDate);
    this.formProfileCoach = formBuilder.group({
      name: [
        null,
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(2),
          Validators.pattern(PATTERN_NAMES),
        ],
      ],
      hobby: [null, [Validators.maxLength(50)]],
      birthday: [null, [Validators.required]],
      document: [null],
      photo: [null, [Validators.required]],
    });
    this.control('document').disable();
    this.filteredActivities = this.control('hobby').valueChanges.pipe(
      untilDestroyed(this),
      startWith(null),
      map((activity: string | null) =>
        activity ? this._filter(activity) : this.allActivities.slice()
      )
    );
    this.control('birthday')
      .valueChanges.pipe(untilDestroyed(this), debounceTime(1000))
      .subscribe((date: Date | null) => {
        if (date) {
          this.age = this.calculateAge(date);
          this.displayLabelDocument = this.age >= 18 ? 'DUI' : 'Carnet';
          this.control('document').enable();
          this.control('document').addValidators(
            this.age >= 18 ? this.validatorsDUI : this.validatorsCarnet
          );
          this.control('document').updateValueAndValidity();
        } else {
          this.displayLabelDocument = 'Documento';
          this.control('document').disable();
          this.control('document').removeValidators(
            this.age >= 18 ? this.validatorsDUI : this.validatorsCarnet
          );
          this.control('document').updateValueAndValidity();
        }
      });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our activity
    if (value) {
      this.activity = value;
      this.control('hobby').setValue(value);
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  remove(): void {
    this.activity = null;
    this.control('hobby').setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.activity = event.option.viewValue;
    this.control('hobby').setValue(event.option.viewValue);
  }

  control(fieldName: string): AbstractControl {
    return this.formProfileCoach.controls[fieldName] as AbstractControl;
  }

  changeFile(file: string | null): void {
    this.control('photo').setValue(file);
  }

  sendForm(): void {
    if (this.formProfileCoach.valid) {
      const { name, hobby, birthday, document, photo } =
        this.formProfileCoach.value;
      const coachInfo: IInfoProfile = {
        name,
        hobby: hobby.trim() === '' ? null : hobby,
        birthday,
        age: this.age,
        document: document.trim() === '' ? null : document,
        photo,
      };
      console.log(coachInfo);
    }
  }

  private calculateAge(date: Date): number {
    const nowDate = new Date();
    let age = nowDate.getFullYear() - date.getFullYear();
    const actualMonth = nowDate.getMonth() + 1;
    const monthBirthday = date.getMonth() + 1;
    if (
      actualMonth < monthBirthday ||
      (actualMonth === monthBirthday && nowDate.getDate() < date.getDate())
    ) {
      age--;
    }
    return age;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allActivities.filter(activity =>
      activity.toLowerCase().includes(filterValue)
    );
  }
}
