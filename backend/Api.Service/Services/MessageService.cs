using Api.Domain.Dto;
using Api.Domain.Entities;
using Api.Domain.Interfaces;
using Api.Domain.Interfaces.Services;
using Api.Domain.Models;
using AutoMapper;

namespace Api.Service.Services
{
    public class MessageService : IMessageService
    {
        private IRepository<MessageEntity> _MessageRepository;
        private readonly IMapper _mapper;

        public MessageService(IRepository<MessageEntity> MessageRepository, IMapper mapper)
        {
            _MessageRepository = MessageRepository;
            _mapper = mapper;
        }

        public async Task<MessageDto> Create(MessageDto message)
        {
            var MessageModel = _mapper.Map<MessageModel>(message);
            var result = await _MessageRepository.InsertAsync(_mapper.Map<MessageEntity>(MessageModel));

            return _mapper.Map<MessageDto>(result);
        }

        public async Task<IEnumerable<MessageDto>> GetAll(Guid chatbotId)
        {
            var result = await _MessageRepository.SelectAsync();
            List<MessageEntity> resultsArray = new List<MessageEntity>();
            return _mapper.Map<IEnumerable<MessageDto>>(resultsArray);
        }
    }
}
