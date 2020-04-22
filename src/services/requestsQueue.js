import Queue from 'smart-request-balancer';

const queue = new Queue({
  rules: {
    tmdb: { // Rule for sending private message via telegram API
      rate: 1,            // one message
      limit: 1,           // per second
    },
  }
});

export default requestsQueue;