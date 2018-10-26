import { NgModule, Type, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandInterfaceComponent } from './components/command-interface/command-interface.component';
import { MaterialModule } from '../helpers/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [CommandInterfaceComponent],
  exports: [CommandInterfaceComponent],
})
export class SharedModule {}
