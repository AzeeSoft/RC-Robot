import { TestBed } from '@angular/core/testing';

import { CommandInterfaceService } from './command-interface.service';

describe('CommandInterfaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommandInterfaceService = TestBed.get(CommandInterfaceService);
    expect(service).toBeTruthy();
  });
});
