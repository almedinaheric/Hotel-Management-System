using System;
using Microsoft.AspNetCore.Mvc;
using eRezervacija.API.Helpers;
using eRezervacija.API.ViewModels;
using eRezervacija.Core;
using eRezervacija.Service;
using Microsoft.AspNetCore.Http;
using eRezervacija.Repository;
using eRezervacija.Core.Autentikacija;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using eRezervacija.Core.ViewModels;

namespace eRezervacija.API.Controllers
{
	[Route("api/[controller]/[action]")]
	[ApiController]
	public class HotelController : ControllerBase
	{
		IHotelService hotelService;
		IHotelDetaljiService hotelDetaljiService;
		IGradService gradService;
		ISobaService sobaService;
		ISlikaService slikaService;
		IRecenzijaService recenzijaService;

		public HotelController(IHotelService hotelService, IHotelDetaljiService hotelDetaljiService, IGradService gradService
			, ISobaService sobaService, ISlikaService slikaService, IRecenzijaService recenzijaService)
		{
			this.hotelService = hotelService;
			this.hotelDetaljiService = hotelDetaljiService;
			this.gradService = gradService;
			this.sobaService = sobaService;
			this.slikaService = slikaService;
			this.recenzijaService = recenzijaService;
		}

		[HttpPost]
		//[Autorizacija(Admin: true, Vlasnik: true, Gost: false)]
		public ActionResult<Hotel> AddHotel(HotelVM hotel)
		{
			var noviHotel = new Hotel()
			{
				Naziv = hotel.Naziv,
				Opis = hotel.Opis,
				Adresa = hotel.Adresa,
				VlasnikID = hotel.VlasnikID,
				HotelDetaljiID = hotel.HotelDetaljiID,
				EmailHotela = hotel.EmailHotela,
				BrojTelefona = hotel.BrojTelefona,
				GradID = hotel.GradID,
				UkupanBrojSoba = hotel.UkupanBrojSoba,
				BrojJednokrevetnihSoba = hotel.BrojJednokrevetnihSoba,
				BrojDvokrevetnihSoba = hotel.BrojDvokrevetnihSoba,
				BrojTrokrevetnihSoba = hotel.BrojTrokrevetnihSoba,
				BrojSpratova = hotel.BrojSpratova,
				VrijemeCheckIna = hotel.VrijemeCheckIna,
				VrijemeCheckOuta = hotel.VrijemeCheckOuta,
				Unlisted = true,
				BrojZvjezdica = hotel.BrojZvjezdica,
				UdaljenostOdCentraGrada = hotel.UdaljenostOdCentraGrada
			};
			if (!string.IsNullOrEmpty(hotel.slika))
			{
				noviHotel.slika = hotel.slika.parseBase64();
			}

			hotelService.Add(noviHotel);
			gradService.DodajHotelUGradu(hotel.GradID);
			return noviHotel;
			
		}

        [HttpPost("{hotelId}")]
        public ActionResult<Hotel> UpdatePodaciHotel(int hotelId, HotelUpdateVM hotel)
        {
            var hotelToUpdate = hotelService.GetByHotelID(hotelId);
            if (hotelToUpdate == null)
            {
                return BadRequest(error: "cannot find hotel");

            }
            hotelToUpdate.Naziv = hotel.Naziv;
            hotelToUpdate.Opis = hotel.Opis;
            hotelToUpdate.Adresa = hotel.Adresa;
            hotelToUpdate.VlasnikID = hotel.VlasnikID;
            hotelToUpdate.EmailHotela = hotel.EmailHotela;
            hotelToUpdate.BrojTelefona = hotel.BrojTelefona;
            hotelToUpdate.slika = hotel.slika.parseBase64();
            hotelToUpdate.GradID = hotel.GradID;
            hotelToUpdate.UkupanBrojSoba = hotel.UkupanBrojSoba;
            hotelToUpdate.BrojJednokrevetnihSoba = hotel.BrojJednokrevetnihSoba;
            hotelToUpdate.BrojDvokrevetnihSoba = hotel.BrojDvokrevetnihSoba;
            hotelToUpdate.BrojTrokrevetnihSoba = hotel.BrojTrokrevetnihSoba;
            hotelToUpdate.BrojSpratova = hotel.BrojSpratova;
            hotelToUpdate.VrijemeCheckIna = hotel.VrijemeCheckIna;
            hotelToUpdate.VrijemeCheckOuta = hotel.VrijemeCheckOuta;
            hotelToUpdate.BrojZvjezdica = hotel.BrojZvjezdica;
            hotelToUpdate.UdaljenostOdCentraGrada = hotel.UdaljenostOdCentraGrada;

            hotelService.Update(hotelToUpdate);
            return hotelToUpdate;
        }

        [HttpGet]
		//[Autorizacija(Admin: true, Vlasnik: true, Gost: true)]
		public IEnumerable<Hotel> GetAllHotels()
		{
			return hotelService.GetAll();
		}

		[HttpGet]
		public List<Hotel> GetUnlistedHotels()
		{
			return hotelService.GetUnlistedHotels();
		}

		[HttpPost]
		public Hotel ListHotel(int id)
		{
			return hotelService.ListHotel(id);
		}

		[HttpPost("{detaljiId}")]
		//[Autorizacija(Admin: true, Vlasnik: true, Gost: false)]
		public ActionResult<HotelDetalji> AddHotelDetalji(int detaljiId, HotelDetaljiVM hotelDetalji)
		{
			if (detaljiId == 0)
			{
				var noviHotelDetalji = new HotelDetalji()
				{
					KonferencijskaSala = hotelDetalji.KonferencijskaSala,
					Bazen = hotelDetalji.Bazen,
					Spa = hotelDetalji.Spa,
					Sauna = hotelDetalji.Sauna,
					Teretana = hotelDetalji.Teretana,
					Restoran = hotelDetalji.Restoran,
					Kafic = hotelDetalji.Kafic
				};
				hotelDetaljiService.Add(noviHotelDetalji);
				return noviHotelDetalji;
			}
			var detaljiToUpdate = hotelDetaljiService.GetByHotelDetaljiID(detaljiId);
			if (detaljiToUpdate == null)
			{
				return BadRequest(error: "cannot find hoteldetalji");
			}
			detaljiToUpdate.KonferencijskaSala = hotelDetalji.KonferencijskaSala;
			detaljiToUpdate.Bazen = hotelDetalji.Bazen;
			detaljiToUpdate.Spa = hotelDetalji.Spa;
			detaljiToUpdate.Sauna = hotelDetalji.Sauna;
			detaljiToUpdate.Teretana = hotelDetalji.Teretana;
			detaljiToUpdate.Restoran = hotelDetalji.Restoran;
			detaljiToUpdate.Kafic = hotelDetalji.Kafic;

			hotelDetaljiService.Update(detaljiToUpdate);
			return detaljiToUpdate;
		}

		[HttpGet]
		public IEnumerable<HotelDetalji> GetAllHotelDetalji()
		{
			return hotelDetaljiService.GetAll();
		}

        [HttpGet("{detaljiId}")]
        public HotelDetalji GetHotelDetaljiByDetaljiId(int detaljiId)
        {
			return hotelDetaljiService.GetByHotelDetaljiID(detaljiId);
        }

        [HttpGet("{vlasnikId}")]
		public IEnumerable<Hotel> GetHotelByVlasnikId(int vlasnikId)
		{
			return hotelService.GetByVlasnikId(vlasnikId);
		}


		[HttpGet("{hotelId}")]
		public Hotel GetHotelByHotelId(int hotelId)
		{
			return hotelService.GetByHotelID(hotelId);
		}


		[HttpGet]
		public PagedList<HotelSearchResult> Search(string grad, DateTime datumCheckIn, DateTime datumCheckOut, int brojGostiju, int brojSoba, int pageNumber = 1, int pageSize = 10,
            [FromQuery] int[] zvjezdice = null, [FromQuery] int[] udaljenost = null, [FromQuery] int[] ocjena = null)
		{
			var data = hotelService.Search(grad, datumCheckIn, datumCheckOut, brojGostiju, brojSoba, pageNumber, pageSize, zvjezdice,udaljenost,ocjena);
			return PagedList<HotelSearchResult>.Create(data, pageNumber, pageSize);
		}

		[HttpDelete("{id}")]
		public Hotel DeleteHotelById(int id)
		{
			var obrisani = hotelService.GetByHotelID(id);
			slikaService.RemoveByHotelId(id);
			sobaService.RemoveByHotelId(id);
			hotelService.RemoveByHotelId(id);
			return obrisani;
        }

		
	}
}

