using AutoMapper;
using TechnicalSkill.Mapping;

namespace TechnicalSkill.Extensions;

public static class ServiceExtensions
{
    public static IServiceCollection AddAutoMapperConfiguration(this IServiceCollection services)
    {
        // Auto Mapper Configurations
        var mapperConfig = new MapperConfiguration(mc =>
        {
            mc.AddProfile(new MappingProfile());
        });

        IMapper mapper = mapperConfig.CreateMapper();
        services.AddSingleton(mapper);
        
        return services;
    }
}
