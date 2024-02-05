import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Injectable()
export class TicketValidationPipe implements PipeTransform {
  constructor(private readonly ticketService: TicketService) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body' && metadata.metatype === Object) {
      const { id, content, created_at } = value;

      if (metadata.type === 'body' && metadata.metatype === Object) {
        const { id, content } = value;
  
        if (id && metadata.metatype === Object) {
          const existingTicket = this.ticketService.getTicketById(id);
  
          if (existingTicket && existingTicket.content === content) {
            throw new BadRequestException('No Change Occurred');
          }
        }
      }
      if (!content) {
        throw new BadRequestException('Content is required');
      }

    }
    

    return value;
  }
}