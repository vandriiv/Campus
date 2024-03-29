﻿using System;
using System.Linq.Expressions;

using Campus.Domain.Entities;

namespace Campus.Application.LectorSubjects.Queries.DataTransferObjects
{
    public class LectorSubjectDto
    {
        public int Id { get; set; }     
        public int LectorId { get; set; }
        public string LectorName { get; set; }
        public int SubjectId { get; set; }
        public string SubjectName { get; set; }
        public int LessonTypeId { get; set; }
        public string LessonTypeName { get; set; }

        public static Expression<Func<LectorSubject,LectorSubjectDto>> Projection
        {
            get
            {
                return x => new LectorSubjectDto
                {
                    Id = x.Id,
                    LectorId = x.LectorId,
                    LectorName = x.Lector != null ? $"{x.Lector.LastName} {x.Lector.FirstName} {x.Lector.Patronymic}" : string.Empty,
                    SubjectId = x.SubjectId,
                    SubjectName = x.Subject != null ? x.Subject.Name : string.Empty,
                    LessonTypeId = x.LessonTypeId,
                    LessonTypeName = x.LessonType != null ? x.LessonType.Name : string.Empty
                };
            }
        }
    }
}
