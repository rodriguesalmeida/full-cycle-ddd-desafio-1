import EventHandlerInterface from "../../../@shared/event/event-handler.interface";


export default class CustomerIsCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: ProductCreatedEvent): void {
    console.log(`Sending email to .....`); 
  }
}
