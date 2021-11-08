import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material-module/material-module.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { ApiInterceptor } from '../core/interceptors/api.interceptor';
import { TokenInterceptor } from '../core/interceptors/token.interceptor';
import { TimeConversionPipe } from './pipes/time-conversion.pipe';
import { NotificationInterceptor } from '../core/interceptors/notification.interceptor';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { RunScriptsDirective } from './directives/run-scripts.directive';
import { LoadingInterceptor } from '../core/interceptors/loading.interceptor';

@NgModule({
  declarations: [TimeConversionPipe, SafeHtmlPipe, RunScriptsDirective],
  imports: [CommonModule, MaterialModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TimeConversionPipe,
    SafeHtmlPipe,
    RunScriptsDirective,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiInterceptor,
          multi: true,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: NotificationInterceptor,
          multi: true,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoadingInterceptor,
          multi: true,
        },
      ],
    };
  }
}
