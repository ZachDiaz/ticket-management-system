import { Controller, Post, Patch, Get, Body, Param } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  getAllTickets() {
    const tickets = this.ticketService.getAllTickets();
    return { tickets };
  }

  @Get(':id')
  getTicketById(@Param('id') id: string) {
    const ticket = this.ticketService.getTicketById(id);
    return { ticket };
  }

  @Post()
  createTicket(@Body() ticket: any) {
    const result = this.ticketService.createTicket(ticket);
    return { message: result };
  }

  @Patch(':id/approve')
  approveTicket(@Param('id') id: string) {
    const result = this.ticketService.approveTicket(id);
    return { message: result };
  }

  @Patch(':id/reject')
  rejectTicket(@Param('id') id: string) {
    const result = this.ticketService.rejectTicket(id);
    return { message: result };
  }

  @Patch(':id/update')
  updateTicket(@Param('id') id: string, @Body() ticket: any) {
    const result = this.ticketService.updateTicket(id, ticket);
    return { message: result };
  }
}
