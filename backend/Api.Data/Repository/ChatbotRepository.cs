using Api.Data.Context;
using Api.Domain.Entities;
using Api.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;


namespace Api.Data.Repository
{
    public class ChatbotRepository : BaseRepository<ChatbotEntity>, IChatbotRepository
    {
        private DbSet<ChatbotEntity> _dataset;

        public ChatbotRepository(MyContext context) : base(context)
        {
            _dataset = _context.Set<ChatbotEntity>();
        }


        public async Task<IEnumerable<ChatbotEntity>> GetChatbotsByUserIdAsync(Guid userId)
        {
            try
            {
            var result = await _dataset
            .Where(chatbot => chatbot.UserId == userId)
            .ToListAsync();

                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}