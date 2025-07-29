using Api.Domain.Dto;
using Api.Domain.Entities;
using Api.Domain.Interfaces;
using Api.Domain.Interfaces.Services;
using Api.Domain.Models;
using AutoMapper;

namespace Api.Service.Services
{
    public class ChatbotService : IChatbotService
    {
        private IRepository<ChatbotEntity> _ChatbotRepository;
        private readonly IMapper _mapper;

        public ChatbotService(IRepository<ChatbotEntity> ChatbotRepository, IMapper mapper)
        {
            _ChatbotRepository = ChatbotRepository;
            _mapper = mapper;
        }

        public async Task<ChatbotDto> Create(ChatbotDto Chatbot)
        {
            var ChatbotModel = _mapper.Map<ChatbotModel>(Chatbot);
            var result = await _ChatbotRepository.InsertAsync(_mapper.Map<ChatbotEntity>(ChatbotModel));

            return _mapper.Map<ChatbotDto>(result);
        }

        public async Task<bool> Delete(Guid id)
        {
            var result = await _ChatbotRepository.DeleteAsync(id);
            return result;
        }

        public async Task<IEnumerable<ChatbotDto>> GetAll()
        {
            var result = await _ChatbotRepository.SelectAsync();
            List<ChatbotEntity> resultsArray = new List<ChatbotEntity>();

            return _mapper.Map<IEnumerable<ChatbotDto>>(resultsArray);
        }

        public async Task<ChatbotDto> GetOneById(Guid id)
        {
            var result = await _ChatbotRepository.SelectAsync(id);
            return _mapper.Map<ChatbotDto>(result);
        }

        public async Task<ChatbotDto> Update(ChatbotDto Chatbot)
        {
            var ChatbotModel = _mapper.Map<ChatbotModel>(Chatbot);
            var result = await _ChatbotRepository.UpdateAsync(_mapper.Map<ChatbotEntity>(ChatbotModel));
            return _mapper.Map<ChatbotDto>(result);
        }
    }
}
