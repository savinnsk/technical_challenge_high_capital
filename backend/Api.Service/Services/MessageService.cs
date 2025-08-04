using Api.Domain.Dto;
using Api.Domain.Entities;
using Api.Domain.Interfaces.Repositories;
using Api.Domain.Interfaces.Services;
using Api.Domain.Models;
using Api.Infrastructure.OpenIa;
using AutoMapper;

namespace Api.Service.Services
{
    public class MessageService : IMessageService
    {
        private IMessageRepository _MessageRepository;
        private IChatbotService _chatbotRepository;
        private readonly IMapper _mapper;

        public MessageService(IMessageRepository MessageRepository,IChatbotService chatbotRepository, IMapper mapper)
        {
            _chatbotRepository = chatbotRepository;
            _MessageRepository = MessageRepository;
            _mapper = mapper;
        }

        public async Task<object> Create(MessageDto message, string userEmail)
        {

            var chatbot = await _chatbotRepository.GetOneById(message.ChatBotId, userEmail);

            message.Role = "user";
            var MessageModel = _mapper.Map<MessageModel>(message);
            await _MessageRepository.InsertAsync(_mapper.Map<MessageEntity>(MessageModel));

            var apiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
            if (string.IsNullOrEmpty(apiKey))
            throw new Exception("OPENAI_API_KEY não configurada.");

            var openIaService = new OpenAIService(apiKey);
            var resOpenIa = await openIaService.GetResponseAsync(chatbot.Context + "=" + message.Content);
            
            message.Role = "assistant";
            message.Content = resOpenIa;

            var MessageModelOpenIa = _mapper.Map<MessageModel>(message);
            await _MessageRepository.InsertAsync(_mapper.Map<MessageEntity>(MessageModelOpenIa));
           
             return new { text = resOpenIa };
        }

        public async Task<IEnumerable<MessageDtoList>> GetAll(Guid chatbotId, string userEmail)
        {
            var result = await _MessageRepository.GetMessagesByChatbotIdAsync(chatbotId);
            return _mapper.Map<IEnumerable<MessageDtoList>>(result);
        }
    }
}
