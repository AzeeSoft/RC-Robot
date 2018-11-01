import { NgModule, Type, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandInterfaceComponent } from './components/command-interface/command-interface.component';
import { MaterialModule } from '../helpers/material/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [CommandInterfaceComponent, ],
  exports: [CommandInterfaceComponent],
})
export class SharedModule {}
