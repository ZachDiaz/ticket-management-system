import { Injectable } from '@nestjs/common';

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0'); 
const day = String(now.getDate()).padStart(2, '0');

@Injectable()
export class TicketService {
  private tickets: any[] = [];
  private ticketIdCounter: number = 1;
  createTicket(ticket: any): string {

    ticket.id = this.ticketIdCounter++;
    ticket.status = 'Pending';
    ticket.created_at = `${year}-${month}-${day}`;
    this.tickets.push(ticket);
    return 'Ticket created';
  }

  approveTicket(id: string): string {
    const ticketIndex = this.findIndexById(id);

    if (ticketIndex !== -1) {
      this.tickets[ticketIndex].updated_at = `${year}-${month}-${day}`;
      this.tickets[ticketIndex].status = 'Approved';
      return `Ticket ${id} approved`;
    } else {
      return `Ticket ${id} not found`;
    }
  }

  rejectTicket(id: string): string {
    const ticketIndex = this.findIndexById(id);

    if (ticketIndex !== -1) {
      this.tickets[ticketIndex].updated_at = `${year}-${month}-${day}`;
      this.tickets[ticketIndex].status = 'Rejected';
      return `Ticket ${id} rejected`;
    } else {
      return `Ticket ${id} not found`;
    }
  }

  updateTicket(id: string, ticket: any): string {
    const ticketIndex = this.findIndexById(id);

    if (ticketIndex !== -1) {
      ticket.updated_at = `${year}-${month}-${day}`;
      this.tickets[ticketIndex] = { ...this.tickets[ticketIndex], ...ticket };
      return `Ticket ${id} updated`;
    } else {
      return `Sorry, Ticket ${id} not found`;
    }
  }

  getAllTickets(): any[] {
    return this.tickets;
  }

  getTicketById(id: string): any {
    const ticket = this.tickets.find((t) => t.id === +id);
    return ticket ? ticket : `Sorry, Ticket ${id} not found`;
  }

  private findIndexById(id: string): number {
    return this.tickets.findIndex((ticket) => ticket.id === +id);
  }
}
