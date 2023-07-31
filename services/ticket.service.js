
import ticketModel from "../models/ticket.js";

class TicketService {
  static async createTicket(code, amount, purchaser) {
    try {
      const ticket = new ticketModel({
        code,
        amount,
        purchaser,
      });
      await ticket.save();
      return ticket;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create ticket');
    }
  }
}

export default TicketService;