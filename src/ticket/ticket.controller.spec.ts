import { Test, TestingModule } from '@nestjs/testing';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

describe('TicketController', () => {
  let controller: TicketController;
  let service: TicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketController],
      providers: [TicketService],
    }).compile();

    controller = module.get<TicketController>(TicketController);
    service = module.get<TicketService>(TicketService);
  });

  describe('getAllTickets', () => {
    it('should successfully return all tickets', () => {
      const tickets = [{ id: 1, content: 'Test Ticket', status: 'Pending', created_at: '2024-02-12' }];
      jest.spyOn(service, 'getAllTickets').mockReturnValue(tickets);

      expect(controller.getAllTickets()).toEqual({ tickets });
    });
  });

  describe('getTicketById', () => {
    it('should successfully return a specific ticket by ID', () => {
      const ticketId = '1';
      const ticket = { id: 1, content: 'Test Ticket', status: 'Pending', created_at: '2024-02-12' };
      jest.spyOn(service, 'getTicketById').mockReturnValue(ticket);

      expect(controller.getTicketById(ticketId)).toEqual({ ticket });
    });
  });

  describe('createTicket', () => {
    it('should successfully create a new ticket', () => {
      const ticket = { content: 'New Ticket' };
      const result = 'Ticket created';
      jest.spyOn(service, 'createTicket').mockReturnValue(result);

      expect(controller.createTicket(ticket)).toEqual({ message: result });
    });
  });

  describe('approveTicket', () => {
    it('should successfully approve an existing ticket', () => {
      const ticketId = '1';
      const result = `Ticket ${ticketId} approved`;
      jest.spyOn(service, 'approveTicket').mockReturnValue(result);

      expect(controller.approveTicket(ticketId)).toEqual({ message: result });
    });
  });

  describe('rejectTicket', () => {
    it('should successfully reject an existing ticket', () => {
      const ticketId = '1';
      const result = `Ticket ${ticketId} rejected`;
      jest.spyOn(service, 'rejectTicket').mockReturnValue(result);

      expect(controller.rejectTicket(ticketId)).toEqual({ message: result });
    });
  });

  describe('updateTicket', () => {
    it('should successfully update an existing ticket', () => {
      const ticketId = '1';
      const ticket = { content: 'Updated Ticket' };
      const result = `Ticket ${ticketId} updated`;
      jest.spyOn(service, 'updateTicket').mockReturnValue(result);

      expect(controller.updateTicket(ticketId, ticket)).toEqual({ message: result });
    });
  });
});
 