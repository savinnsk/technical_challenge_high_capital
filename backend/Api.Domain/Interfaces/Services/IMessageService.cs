using Api.Domain.Dto;

namespace Api.Domain.Interfaces.Services
{
    public interface IMessageService
    {
        //Task<MessageDto> GetOneById(Guid messageId);
        Task<IEnumerable<MessageDto>> GetAll(Guid chatbotId,string userEmail);
        //Task<UserDto> Update(MessageDto message);
        Task<MessageDto> Create(MessageDto message,string userEmail);
       //Task<bool> Delete(Guid id);
    }
}
