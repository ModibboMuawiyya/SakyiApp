using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using Application.Fabrics;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers
{

    public class FabricsController : BaseController
    {

        [HttpGet]
        public async Task<ActionResult<List<FabricDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<FabricDto>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command) => await Mediator.Send(command);

        [HttpPut("{id}")]
        [Authorize(Policy = "IsFabricOwner")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "IsFabricOwner")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {

            return await Mediator.Send(new Delete.Command { Id = id });
        }

        [HttpPost("{id}/{liked}")]
        public async Task<ActionResult<Unit>> liked(Guid id)
        {
            return await Mediator.Send(new Liked.Command { Id = id });
        }

        [HttpDelete("{id}/liked")]
        public async Task<ActionResult<Unit>> Unlike(Guid id)
        {
            return await Mediator.Send(new Unlike.Command { Id = id });
        }
    }
}