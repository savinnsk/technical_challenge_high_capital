using Api.Domain.Dto;
using Api.Domain.Entities;
using Api.Domain.Interfaces.Repositories;
using Api.Domain.Interfaces.Services;
using Api.Domain.Models;
using AutoMapper;

namespace Api.Service.Services
{
    public class ChatbotService : IChatbotService
    {
        private IChatbotRepository _ChatbotRepository;
        private IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public ChatbotService(
        IChatbotRepository ChatbotRepository,
        IUserRepository userRepository,
        IMapper mapper)
        {
            _ChatbotRepository = ChatbotRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<ChatbotDto> Create(ChatbotDto chatbot, string userEmail)
        {
            var user = await _userRepository.GetByEmail(userEmail);
            if (user == null) throw new UnauthorizedAccessException("Usuário inválido.");

            var chatbotContext = chatbot.Context;
            chatbot.Context = "Responda como um" + chatbotContext;
            chatbot.UserId = user.Id;

            var ChatbotModel = _mapper.Map<ChatbotModel>(chatbot);
            var result = await _ChatbotRepository.InsertAsync(_mapper.Map<ChatbotEntity>(ChatbotModel));

            return _mapper.Map<ChatbotDto>(result);
        }

        public async Task<bool> Delete(Guid id, string userEmail)
        {
            var user = await _userRepository.GetByEmail(userEmail);
            if (user == null) throw new UnauthorizedAccessException("Usuário inválido.");

            var chatbot = await _ChatbotRepository.SelectAsync(id);
            if (chatbot == null) throw new KeyNotFoundException("Chatbot não encontrado.");

            if (chatbot.UserId != user.Id)
                throw new UnauthorizedAccessException("Você não tem permissão para deletar esse chatbot.");

            return await _ChatbotRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<ChatbotUpdateDto>> GetAll(string userEmail){

            var user = await _userRepository.GetByEmail(userEmail);
            if (user == null) throw new UnauthorizedAccessException("Usuário inválido.");

            var result = await _ChatbotRepository.GetChatbotsByUserIdAsync(user.Id);

            return _mapper.Map<IEnumerable<ChatbotUpdateDto>>(result);
        }

        public async Task<ChatbotDto> GetOneById(Guid id, string userEmail)
        {
            var user = await _userRepository.GetByEmail(userEmail);
            if (user == null) throw new UnauthorizedAccessException("Usuário inválido.");

            var chatbot = await _ChatbotRepository.SelectAsync(id);
            if (chatbot == null) throw new KeyNotFoundException("Chatbot não encontrado.");

            if (chatbot.UserId != user.Id)
            throw new UnauthorizedAccessException("Você não tem permissão para deletar esse chatbot.");


            return _mapper.Map<ChatbotDto>(chatbot);
        }

        public async Task<ChatbotDto> Update(ChatbotUpdateDto Chatbot, string userEmail)
        {
            var user = await _userRepository.GetByEmail(userEmail);
            if (user == null) throw new UnauthorizedAccessException("Usuário inválido.");

            var chatbot = await _ChatbotRepository.SelectAsync(Chatbot.Id);
            if (chatbot == null) throw new KeyNotFoundException("Chatbot não encontrado.");

            if (chatbot.UserId != user.Id)
            throw new UnauthorizedAccessException("Você não tem permissão para deletar esse chatbot.");

            var ChatbotModel = _mapper.Map<ChatbotModel>(Chatbot);
            var result = await _ChatbotRepository.UpdateAsync(_mapper.Map<ChatbotEntity>(ChatbotModel));
            return _mapper.Map<ChatbotDto>(result);
        }
    }
}
