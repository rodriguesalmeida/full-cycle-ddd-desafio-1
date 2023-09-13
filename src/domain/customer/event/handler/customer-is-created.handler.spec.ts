import EventDispatcher from "../../../@shared/event/event-dispatcher";
import CustomerChangeAddressEvent from "../customer-change-address.event";
import CustomerCreatedEvent from "../customer-created.event";
import CustomerChangeAddressHandler from "./customer-change-address.handler";
import CustomerIsCreatedHandler from "./customer-is-created.handler";
import Customer2IsCreatedHandler from "./customer2-is-created.handler";

describe("Customer is created", () => {

    it("should notify all event handlers", () =>{
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new CustomerIsCreatedHandler();
        const eventHandler2 = new Customer2IsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register('CustomerCreatedEvent', eventHandler);
        eventDispatcher.register('CustomerCreatedEvent', eventHandler2);
        
        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]).toMatchObject(eventHandler);

        const customerCreatedEvent = new CustomerCreatedEvent({
            nome:'Anderson'
        });
        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();


    });

    it("should notify when change address", () =>{
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new CustomerChangeAddressHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register('CustomerChangeAddressEvent', eventHandler);
        
        
        expect(eventDispatcher.getEventHandlers['CustomerChangeAddressEvent'][0]).toMatchObject(eventHandler);

        const customerCreatedEvent = new CustomerChangeAddressEvent({
            id:12,
            nome:"Anderson",
            endereco:"Rua das Palmeidas, 12, Centro"
        });
        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();


    });
});