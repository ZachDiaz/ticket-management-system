import { Controller, Post, Patch, Get, Body, Param, UseGuards } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { AuthGuard } from '@nestjs/passport';
import { TicketValidationPipe } from './ticket-validation.pipe';

@Controller('tickets')
@UseGuards(AuthGuard('local'))
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
  createTicket(@Body(new TicketValidationPipe()) ticket: any) {
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
  updateTicket(@Param('id') id: string, @Body(new TicketValidationPipe()) ticket: any) {
    const result = this.ticketService.updateTicket(id, ticket);
    return { message: result };
  }
}
