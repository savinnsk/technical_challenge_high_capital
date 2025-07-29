using Api.Domain.Entities;

namespace Api.Domain.Interfaces.Repositories
{
    public interface IChatbotRepository : IRepository<ChatbotEntity>
    {
        Task<IEnumerable<ChatbotEntity>> GetChatbotsByUserIdAsync(Guid userId);
    }
}
