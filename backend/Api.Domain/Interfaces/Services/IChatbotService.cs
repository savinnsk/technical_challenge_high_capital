using Api.Domain.Dto;

namespace Api.Domain.Interfaces.Services
{
    public interface IChatbotService
    {
        Task<ChatbotDto> GetOneById(Guid chatbotId);
        Task<IEnumerable<ChatbotDto>> GetAll();
        Task<ChatbotDto> Update(ChatbotDto chatbot);
        Task<ChatbotDto> Create(ChatbotDto chatbot);
        Task<bool> Delete(Guid chatbotId);
    }
}
