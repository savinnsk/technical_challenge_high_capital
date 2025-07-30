using Api.Data.Context;
using Api.Domain.Entities;
using Api.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;


namespace Api.Data.Repository
{
    public class MessageRepository : BaseRepository<MessageEntity>, IMessageRepository
    {
        private DbSet<MessageEntity> _dataset;

        public MessageRepository(MyContext context) : base(context)
        {
            _dataset = _context.Set<MessageEntity>();
        }

        public async Task<IEnumerable<MessageEntity>> GetMessagesByChatbotIdAsync(Guid chatbotId)
           {
            try
            {
            var result = await _dataset
            .Where(message => message.ChatbotId == chatbotId)
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