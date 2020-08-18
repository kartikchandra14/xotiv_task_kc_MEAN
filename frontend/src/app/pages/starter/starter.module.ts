
/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';
import { StarterMenuComponent } from './starter.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbMenuModule, NbIconModule } from '@nebular/theme';
@NgModule({
    imports: [NbEvaIconsModule,
      NbIconModule],
    declarations: [StarterMenuComponent],
  })

export class StarterMenuModule { }
