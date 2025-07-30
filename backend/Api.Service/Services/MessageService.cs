using System.Text.Json;
using Api.Domain.Dto;
using Api.Domain.Entities;
using Api.Domain.Interfaces;
using Api.Domain.Interfaces.Repositories;
using Api.Domain.Interfaces.Services;
using Api.Domain.Models;
using AutoMapper;

namespace Api.Service.Services
{
    public class MessageService : IMessageService
    {
        private IMessageRepository _MessageRepository;
        private readonly IMapper _mapper;

        public MessageService(IMessageRepository MessageRepository, IMapper mapper)
        {
            _MessageRepository = MessageRepository;
            _mapper = mapper;
        }

        public async Task<MessageDto> Create(MessageDto message, string userEmail)
        {
            message.Role = "user";
            var json = JsonSerializer.Serialize(message, new JsonSerializerOptions
            {
                WriteIndented = true // deixa formatado (bonito)
            });
            Console.WriteLine(json);
            var MessageModel = _mapper.Map<MessageModel>(message);
            var result = await _MessageRepository.InsertAsync(_mapper.Map<MessageEntity>(MessageModel));

            return _mapper.Map<MessageDto>(result);
        }

        public async Task<IEnumerable<MessageDto>> GetAll(Guid chatbotId, string userEmail)
        {
            var result = await _MessageRepository.GetMessagesByChatbotIdAsync(chatbotId);
            return _mapper.Map<IEnumerable<MessageDto>>(result);
        }
    }
}
