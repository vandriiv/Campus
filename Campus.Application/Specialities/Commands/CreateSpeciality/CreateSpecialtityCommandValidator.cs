﻿using FluentValidation;

namespace Campus.Application.Specialities.Commands.CreateSpeciality
{
    public class CreateSpecialtityCommandValidator : AbstractValidator<CreateSpecialityCommand>
    {
        public CreateSpecialityCommandHandler()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(50);
            RuleFor(x => x.Code).NotEmpty();
        }
    }
}
