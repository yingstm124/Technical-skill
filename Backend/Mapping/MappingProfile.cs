using AutoMapper;
using TechnicalSkill.DTOs;
using TechnicalSkill.Models;

namespace TechnicalSkill.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Assignment mappings
        CreateMap<Assignment, AssignmentResponseDTO>()
            .ForMember(dest => dest.MultipleChoiceOptions, opt => 
                opt.MapFrom(src => src.MultipleChoiceOptions));
                
        CreateMap<AssignmentCreateDTO, Assignment>()
            .ForMember(dest => dest.MultipleChoiceOptions, opt => 
                opt.MapFrom(src => src.MultipleChoiceOptions));
                
        CreateMap<AssignmentUpdateDTO, Assignment>();

        // MultipleChoiceOption mappings
        CreateMap<MultipleChoiceOption, MultipleChoiceOptionResponseDTO>()
            .ForMember(dest => dest.AssignmentId, opt => 
                opt.MapFrom(src => src.AssignmentId));
                
        CreateMap<MultipleChoiceOptionDTO, MultipleChoiceOption>()
            .ForMember(dest => dest.Assignment, opt => opt.Ignore())
            .ForMember(dest => dest.AssignmentId, opt => opt.Ignore())
            .ForMember(dest => dest.Id, opt => opt.Ignore());
        
        // Reverse mappings where applicable
        CreateMap<Assignment, AssignmentCreateDTO>();
        CreateMap<Assignment, AssignmentUpdateDTO>();
    }
}
