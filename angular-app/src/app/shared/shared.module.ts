import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommandInterfaceComponent } from './components/command-interface/command-interface.component';

@NgModule({
  imports: [CommonModule, FormsModule, BrowserAnimationsModule],
  declarations: [CommandInterfaceComponent],
  exports: [CommandInterfaceComponent],
})
export class SharedModule {}
