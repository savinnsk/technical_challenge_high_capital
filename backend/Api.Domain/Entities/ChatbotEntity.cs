namespace Api.Domain.Entities
{

    public class Chatbot
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Context { get; set; }

        public Guid? UserId { get; set; }  // se houver usuários
        public UserEntity? User { get; set; }

        public ICollection<Message> Messages { get; set; }
    }
}