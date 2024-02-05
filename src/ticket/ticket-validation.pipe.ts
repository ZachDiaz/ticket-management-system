import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class TicketValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body' && metadata.metatype) {
      this.validateContent(value);
    }
    return value;
  }

  private validateContent(value: any) {
    const { content } = value;

    if (!content || content.trim().length === 0) {
      throw new BadRequestException('Ticket content cannot be empty');
    }
  }
}