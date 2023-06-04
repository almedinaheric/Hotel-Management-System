using System;
using Microsoft.AspNetCore.Mvc;
using eRezervacija.API.Helpers;
using eRezervacija.API.ViewModels;
using eRezervacija.Core;
using eRezervacija.Service;
using Microsoft.AspNetCore.Http;
using eRezervacija.Repository;
using eRezervacija.Core.Autentikacija;

namespace eRezervacija.API.Controllers
{

	[Route("api/[controller]/[action]")]
	[ApiController]
	public class SobaController : ControllerBase
	{
		ISobaDetaljiService sobaDetaljiService;
		ISobaService sobaService;
		ISlikaService slikaService;
		IRasporedSobaService rasporedSobaService;

		public SobaController(ISobaService sobaService, ISobaDetaljiService sobaDetaljiService, ISlikaService slikaService, IRasporedSobaService rasporedSobaService)
		{
			this.sobaDetaljiService = sobaDetaljiService;
			this.sobaService = sobaService;
			this.slikaService = slikaService;
			this.rasporedSobaService = rasporedSobaService;
		}


		[HttpPost]
		public Soba AddSoba(SobaVM soba)
		{
			var novaSoba = new Soba()
			{
				Naziv = soba.Naziv,
				Opis = soba.Opis,
				HotelID = soba.HotelID,
				SobaDetaljiID = soba.SobaDetaljiID,
				Kapacitet = soba.Kapacitet,
				BrojKreveta = soba.BrojKreveta,
				BrojKrevetaZaJednuOsobu = soba.BrojKrevetaZaJednuOsobu,
				BrojKrevetaNaSprat = soba.BrojKrevetaNaSprat,
				BrojBracnihKreveta = soba.BrojBracnihKreveta,
				MogucnostDodavanjaDjecijegKreveta = soba.MogucnostDodavanjaDjecijegKreveta,
				UkupnaCijena = soba.UkupnaCijena
			};
			sobaService.Add(novaSoba);
			var sobaId = sobaService.GetSobaIdBySoba(novaSoba);
			rasporedSobaService.AddRoom(sobaId);
			return novaSoba;
		}

		[HttpGet]
		public IEnumerable<Soba> GetAllSoba()
		{
			return sobaService.GetAll();
		}


		[HttpPost]
		public SobaDetalji AddSobaDetalji(SobaDetaljiVM detalji)
		{
			var noviDetalji = new SobaDetalji()
			{
				Tv = detalji.Tv,
				WiFi = detalji.WiFi,
				Kuhinja = detalji.Kuhinja,
				DozvoljenoPusenje = detalji.DozvoljenoPusenje,
				KucniLjubimci = detalji.KucniLjubimci,
				PrilagodjenoZaDjecu = detalji.PrilagodjenoZaDjecu,
				Fen = detalji.Fen,
				Pegla = detalji.Pegla,
				DodatniJastuci = detalji.DodatniJastuci,
				Mikrovalna = detalji.Mikrovalna,
				KafeAparat = detalji.KafeAparat,
				Kuhalo = detalji.Kuhalo,
				OcistitiPrijeOdlaska = detalji.OcistitiPrijeOdlaska,
				Kupatilo = detalji.Kupatilo,
				Klima = detalji.Klima,
				Grijanje = detalji.Grijanje,
				Balkon = detalji.Balkon
			};
			sobaDetaljiService.Add(noviDetalji);
			return noviDetalji;
		}

		[HttpGet]
		public IEnumerable<SobaDetalji> GetAllSobaDetalji()
		{
			return sobaDetaljiService.GetAll();
		}

		[HttpGet("{hotelId}")]
		public IEnumerable<Soba> GetSobeByHotelId(int hotelId, DateTime dolazak, DateTime odlazak)
		{
			//return sobaService.GetByHotelId(hotelId);
			return sobaService.GetForKonfiguracija(hotelId, dolazak, odlazak);
		}

		[HttpGet("{hotelId}")]
		public IEnumerable<Soba> GetSobaByHotelId(int hotelId)
		{
			return sobaService.GetByHotelId(hotelId);
		}

        [HttpGet("{sobaId}")]
        public Soba GetBySobaId(int sobaId)
        {
            return sobaService.GetBySobaID(sobaId);
        }

        [HttpDelete("{id}")]
		public Soba DeleteSobaById(int id)
		{
			var obrisana = sobaService.GetBySobaID(id);
			var sveSlike = slikaService.GetBySobaId(id);
			if (sveSlike != null)
			{
				slikaService.RemoveBySobaId(id);
			}
			sobaService.RemoveBySobaId(id);
			return obrisana;
		}
	}
}

