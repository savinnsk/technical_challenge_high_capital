namespace Api.Domain.Entities
{



    public class Message : BaseEntity
    {
        public Guid Id { get; set; }

        public Guid ChatbotId { get; set; }
        public Chatbot Chatbot { get; set; }

        public string Role { get; set; } // "user" ou "assistant"
        public string Content { get; set; }

    }
}
