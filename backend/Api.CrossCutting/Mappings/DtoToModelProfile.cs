using Api.Domain.Dto;
using Api.Domain.Models;
using AutoMapper;

namespace Api.CrossCutting.Mappings
{
    public class DtoToModelProfile : Profile
    {
        public DtoToModelProfile()
        {
            CreateMap<UserModel, UserDto>().ReverseMap();
            CreateMap<MessageModel, MessageDto>().ReverseMap();
            CreateMap<ChatbotModel, ChatbotDto>().ReverseMap();
        }
    }
}
