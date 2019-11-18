﻿using FluentValidation;

namespace Campus.Application.Lectors.Commands.UpdateLector
{
    public class UpdateLectorCommandValidator : AbstractValidator<UpdateLectorCommand>
    {
        public UpdateLectorCommandValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.FirstName).NotEmpty().MaximumLength(35);
            RuleFor(x => x.LastName).NotEmpty().MaximumLength(35);
            RuleFor(x => x.Patronymic).NotEmpty().MaximumLength(35);
            RuleFor(x => x.Email).NotEmpty().MaximumLength(255).EmailAddress();
            RuleFor(x => x.PhoneNumber).NotEmpty().MaximumLength(24); //todo: add regex
            RuleFor(x => x.AcademicDegreeId).NotEmpty();
            RuleFor(x => x.AcademicRankId).NotEmpty();
        }
    }
}
