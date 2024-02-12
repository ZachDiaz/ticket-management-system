import { Test, TestingModule } from '@nestjs/testing';
import { TicketService } from './ticket.service';

describe('TicketService', () => {
  let service: TicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketService],
    }).compile();

    service = module.get<TicketService>(TicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTicket', () => {
    it('should successfully create a ticket', () => {
      const ticketContent = 'Ticket Test';
      const createdTicketId = service.createTicket({ content: ticketContent });
      const tickets = service.getAllTickets();
      const createdTicket = tickets.find(ticket => ticket.content === ticketContent);

      expect(createdTicket).toBeDefined();
      expect(createdTicket.id).toBeDefined();
      expect(createdTicket.content).toEqual(ticketContent);
      expect(createdTicket.status).toEqual('Pending');
      expect(createdTicket.created_at).toBeDefined();
    });
  });

  describe('approveTicket', () => {
    it('should successfully approve an existing ticket', () => {
      service.createTicket({ content: 'Ticket Test' });
      const tickets = service.getAllTickets();
      const createdTicketId = tickets[tickets.length - 1].id;
      //console.log(createdTicketId);
      const approvalMessage = service.approveTicket(createdTicketId);

      expect(approvalMessage).toContain('approved');
      expect(service.getTicketById(createdTicketId).status).toEqual('Approved');
    });

    it('should show a failed message when there is no existing ticket to approve', () => {
      const approvalMessage = service.approveTicket('not-a-real-ticket');
      expect(approvalMessage).toContain('not found');
    });
  });

  describe('rejectTicket', () => {
    it('should successfully reject an existing ticket', () => {
      service.createTicket({ content: 'Ticket Test' });
      const tickets = service.getAllTickets();
      const createdTicketId = tickets[tickets.length - 1].id;
      const rejectionMessage = service.rejectTicket(createdTicketId);

      expect(rejectionMessage).toContain('rejected');
      expect(service.getTicketById(createdTicketId).status).toEqual('Rejected');
    });

    it('should show a failed message when there is no existing ticket to reject', () => {
      const rejectionMessage = service.rejectTicket('not-a-real-ticket');
      expect(rejectionMessage).toContain('not found');
    });
  });

  describe('updateTicket', () => {
    it('should successfully update an existing ticket', () => {
      service.createTicket({ content: 'Ticket Test' });
      const tickets = service.getAllTickets();
      const createdTicketId = tickets[tickets.length - 1].id;
  
      const updatedTicketContent = 'Updated Ticket Test';
      const updateMessage = service.updateTicket(createdTicketId, { content: updatedTicketContent });
      //console.log(updateMessage);
      expect(updateMessage).toContain('updated');
      const updatedTicket = service.getTicketById(createdTicketId);
      expect(updatedTicket.content).toEqual(updatedTicketContent);
    });
  
    it('should return an error message for non-existent tickets', () => {
      const updateMessage = service.updateTicket('not-a-real-ticket', { content: 'Updated Ticket Test' });
  
      expect(updateMessage).toContain('not found');
    });
  });


});
