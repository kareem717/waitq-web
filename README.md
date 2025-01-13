# waitQ Web (Incomplete)

waitQ Web is the frontend companion to the waitQ API. The goal was to build a simple, user-friendly interface for managing waitlists for new product launches. Unfortunately, I never completed the project due to time constraints, and a few commits with key functionality may have been lost locally.

---

## How It Works

This app serves as the client-facing frontend, working in conjunction with the [waitQ API backend](https://github.com/kareem717/waitq-api). It relies on:  
- **Supabase**: For user authentication and session management.  
- **AWS SES**: For sending transactional emails like confirmation or notification messages.

To integrate with the backend, I used the [@openapitools/openapi-generator-cli](https://github.com/OpenAPITools/openapi-generator-cli) to generate a type-safe SDK based on the backend's OpenAPI specification.

---

## Why I Built This

The project began as a learning exercise to explore how to create a cohesive system using modern tools and frameworks. My aim was to experiment with:  
- Type-safe frontend-backend communication.  
- Using OpenAPI to streamline SDK generation.  
- Building a modern, reusable frontend for a waitlist system.  

---

## Known Limitations

- The project is incomplete, and some functionality is missing.  
- The code quality reflects its status as a learning project rather than a production-ready app.  

---

## Getting Started

While this repository isn't actively maintained, you’re welcome to explore the code and adapt it to your needs. If you're using it alongside the backend, you can find the API repo here:  
👉 [waitQ API](https://github.com/kareem717/waitq-api)  

---

## Acknowledgments

This was a fun experiment that helped me learn a lot about integrating different tools and technologies. Although it’s unfinished, I hope it can be useful to others working on similar projects!
