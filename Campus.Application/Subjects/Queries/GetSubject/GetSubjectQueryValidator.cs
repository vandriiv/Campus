﻿using FluentValidation;

namespace Campus.Application.Subjects.Queries.GetSubject
{
    public class GetSubjectQueryValidator : AbstractValidator<GetSubjectQuery>
    {
        public GetSubjectQueryValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
        }
    }
}
