using System;
using eRezervacija.Core;
using eRezervacija.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using eRezervacija.API.Helpers;
using eRezervacija.API.ViewModels;

namespace eRezervacija.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SlikaController:ControllerBase
	{
        ISlikaService slikaService;

		public SlikaController(ISlikaService slikaService)
		{
            this.slikaService = slikaService;
		}

        [HttpPost]
        public Slika AddSlika(SlikaVM slikaVM)
        {
            var novaSlika = new Slika()
            {
                SobaID = slikaVM.sobaId,
                HotelID=slikaVM.hotelId,
                SlikaByteArray = slikaVM.slika.parseBase64()
            };
            slikaService.Add(novaSlika);
            return novaSlika;
        }

        [HttpGet]
        public IEnumerable<Slika> GetAll()
        {
            return slikaService.GetAll();
        }

        [HttpGet("{sobaId}")]
        public IEnumerable<Slika> GetBySobaId(int sobaId)
        {
            return slikaService.GetBySobaId(sobaId);
        }

        [HttpGet("{hotelId}")]
        public IEnumerable<Slika> GetByHotelId(int hotelId)
        {
            return slikaService.GetByHotelId(hotelId);
        }

    }
}

