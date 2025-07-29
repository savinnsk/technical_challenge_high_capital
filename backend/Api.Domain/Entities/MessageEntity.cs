namespace Api.Domain.Entities
{



    public class MessageEntity : BaseEntity
    {
        public  Guid Id { get; set; }

        public Guid ChatbotId { get; set; }
        public ChatbotEntity Chatbot { get; set; }

        public string Role { get; set; } // "user" ou "assistant"
        public string Content { get; set; }

    }
}
