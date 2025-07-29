using Api.Domain.Dto;
using Api.Domain.Entities;
using AutoMapper;

namespace Api.CrossCutting.Mappings
{
    public class EntityToDtoProfile : Profile
    {
        public EntityToDtoProfile()
        {
            CreateMap<UserDto, UserEntity>().ReverseMap();
            CreateMap<MessageDto, MessageEntity>().ReverseMap();
            CreateMap<ChatbotDto, ChatbotEntity>().ReverseMap();
        }
    }
}
