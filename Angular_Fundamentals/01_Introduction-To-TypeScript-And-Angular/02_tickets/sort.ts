import { Ticket } from './Ticket';

function handleInput(ticketsInput: string[]) {
    let tickets: Ticket[] = []

    for (let ticket of ticketsInput) {
        let [destination, price, status] = ticket.split('|')

        tickets.push(new Ticket(destination, Number(price), status))
    }

    return tickets
}

function sortTickets(ticketsInput: string[], criteria: string) {
    let tickets = handleInput(ticketsInput)
    return tickets.sort(sortStrategies[criteria])
}

let sortStrategies: object = {
    destination: (a:Ticket, b:Ticket) => a.destination.localeCompare(b.destination),
    status: (a:Ticket, b:Ticket) => a.status.localeCompare(b.status),
    price: (a:Ticket, b:Ticket) => a.price - b.price
  }

let result = sortTickets(
    [
      'Philadelphia|94.20|available',
      'New York City|95.99|available',
      'New York City|95.99|sold',
      'Boston|126.20|departed'
    ],
    'status')
  
  console.log(result)