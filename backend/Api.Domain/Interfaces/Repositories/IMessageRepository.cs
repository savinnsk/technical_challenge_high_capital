using Api.Domain.Entities;

namespace Api.Domain.Interfaces.Repositories
{
    public interface IMessageRepository : IRepository<MessageEntity>
    {
        Task<IEnumerable<MessageEntity>> GetMessagesByChatbotIdAsync(Guid chatbotId);
    }
}