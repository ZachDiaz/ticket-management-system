import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

describe('TicketController', () => {
  let controller: TicketController;

  beforeEach(() => {
    controller = new TicketController(new TicketService());
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});