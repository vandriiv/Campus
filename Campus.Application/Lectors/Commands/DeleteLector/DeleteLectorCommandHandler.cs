﻿using System;
using System.Threading;
using System.Threading.Tasks;

using MediatR;

using Campus.Persistence;
using Campus.Application.Exceptions;
using Campus.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Campus.Application.Lectors.Commands.DeleteLector
{
    public class DeleteLectorCommandHandler : IRequestHandler<DeleteLectorCommand, Unit>
    {
        private readonly CampusDbContext _context;

        public DeleteLectorCommandHandler(CampusDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteLectorCommand request, CancellationToken cancellationToken)
        {
            var lector = await _context.Lectors.FindAsync(request.Id);

            if (lector == null)
            {
                throw new NotFoundException(nameof(Lector), request.Id);
            }

            var isUsedInLectorSubject = await _context.LectorSubjects.AnyAsync(x => x.LectorId == request.Id);
            if (isUsedInLectorSubject)
            {
                throw new DeleteFailureException(nameof(Lector), request.Id, "There are subject(s) assigned to this lector");
            }

            _context.Lectors.Remove(lector);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
