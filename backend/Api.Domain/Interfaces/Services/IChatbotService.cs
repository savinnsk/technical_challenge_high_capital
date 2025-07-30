using Api.Domain.Dto;

namespace Api.Domain.Interfaces.Services
{
    public interface IChatbotService
    {
        Task<ChatbotDto> GetOneById(Guid chatbotId, string userEmail);
        Task<IEnumerable<ChatbotUpdateDto>> GetAll(string? userEmail);
        Task<ChatbotDto> Update(ChatbotUpdateDto chatbot, string userEmail);
        Task<ChatbotDto> Create(ChatbotDto chatbot, string? userEmail);
        Task<bool> Delete(Guid chatbotId, string? userEmail);
    }
}
