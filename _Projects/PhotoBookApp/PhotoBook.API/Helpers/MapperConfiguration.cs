using System.Linq;
using AutoMapper;
using PhotoBook.API.Dtos;
using PhotoBook.API.Models;

namespace PhotoBook.API.Helpers
{
    public class MapperConfiguration : Profile
    {
        public MapperConfiguration()
        {
            CreateMap<User, UsersListDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt =>
                {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });

            CreateMap<User, UserForDetailsDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt =>
                {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });

            CreateMap<Photo, PhotoDetailsDto>();
            CreateMap<UserUpdateDto, User>();
            CreateMap<Photo, PhotoReturnDto>();
            CreateMap<PhotoCreateDto, Photo>();
            CreateMap<UserForRegistrationDto, User>();
        }
    }
}