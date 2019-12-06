﻿using System.Threading.Tasks;
using Campus.Application.Lessons.Queries.GetAllLectorsLessons;
using Microsoft.AspNetCore.Mvc;

namespace Campus.WebUI.Controllers
{
    public class LessonController : BaseController
    {
        [HttpGet("lector/{id}")]
        public async Task<IActionResult> GetByLectorId(int id)
        {
            return Ok(await Mediator.Send(new GetAllLectorsLessonsQuery { LectorId = id }));
        }
    }
}