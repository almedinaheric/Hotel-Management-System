using eRezervacija.API.ViewModels;
using eRezervacija.Core;
using eRezervacija.Core.ViewModels;
using eRezervacija.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.SqlServer.Query.Internal;
using Microsoft.Extensions.Configuration.EnvironmentVariables;
using Microsoft.VisualBasic;

namespace eRezervacija.Service
{
	public interface IRezervacijaService
	{
		Rezervacija Add(RezervacijaAddVM obj);
		void UpdateCijenu(int id, float cijena);
		IEnumerable<Rezervacija> GetAll();
		IEnumerable<RezervacijaReturnVM> GetByGostId(int gostId);
        IEnumerable<RezervacijaReturnVM> GetByVlasnikHotelaId(int vlasnikId);
    }
	public class RezervacijaService : IRezervacijaService
	{
		IRepository<Rezervacija> rezervacijaRepository;
		IRezervacijaSobaService rezervacijaSobaService;
		ISobaService sobaService;
		IHotelService hotelService;
		public RezervacijaService(IRepository<Rezervacija> rezervacijaRepository, IRezervacijaSobaService rezervacijaSobaService, ISobaService sobaService,IHotelService hotelService)
		{
			this.rezervacijaRepository = rezervacijaRepository;
			this.rezervacijaSobaService = rezervacijaSobaService;
			this.sobaService = sobaService;
			this.hotelService = hotelService;
		}
		public Rezervacija Add(RezervacijaAddVM rezervacija)
		{
			var novaRezervacija = new Rezervacija()
			{
				GostId = rezervacija.GostId,
				DatumRezervacije = DateTime.Now,
				DatumCheckIn = rezervacija.DatumCheckIn,
				DatumCheckOut = rezervacija.DatumCheckOut,
				BrojGostiju = rezervacija.BrojGostiju,
				BrojOdraslih = rezervacija.BrojOdraslih,
				BrojDjece = rezervacija.BrojDjece,
				NacinPlacanjaId = rezervacija.NacinPlacanjaId,
				Cijena = rezervacija.Cijena,
				BrojRezervacije = Guid.NewGuid(),
			};
			rezervacijaRepository.Add(novaRezervacija);
			return novaRezervacija;
		}

		public IEnumerable<Rezervacija> GetAll()
		{
			return rezervacijaRepository.GetAll();
		}

		public IEnumerable<RezervacijaReturnVM> GetByGostId(int gostId)
		{
			//sve rezervacije ovoga gosta
			var tempRezervacije = rezervacijaRepository.GetAll().Where(r => r.GostId == gostId);
			var returnLista = new List<RezervacijaReturnVM>();

			//pokusavamo povezati rezervaciju sa hotelom (zbog imena)
			foreach (var item in tempRezervacije)
			{
                 var rezervacija = new RezervacijaReturnVM()
				{
					NazivHotela=hotelService.GetByHotelID(rezervacijaSobaService.GetSobaFromRezervacijaId(item.Id).HotelID).Naziv,
					//Sobe=
					DatumRezervacije = item.DatumRezervacije.ToShortDateString(),
					DatumCheckIn = item.DatumCheckIn.ToShortDateString(),
					DatumCheckOut = item.DatumCheckOut.ToShortDateString(),
					BrojGostiju = item.BrojGostiju,
					BrojDjece = item.BrojDjece,
					Cijena = item.Cijena,
					BrojRezervacije=item.BrojRezervacije
				};
				returnLista.Add(rezervacija);
			}
			return returnLista;
		}

		public IEnumerable<RezervacijaReturnVM> GetByVlasnikHotelaId (int vlasnikId)
		{
            var returnLista = new List<RezervacijaReturnVM>();
			var sviHoteliVlasnika = hotelService.GetByVlasnikId(vlasnikId);

			foreach(var hotel in sviHoteliVlasnika)
			{
				var sveSobeHotela = sobaService.GetByHotelId(hotel.Id);

				foreach(var soba in sveSobeHotela)
				{
					var rezervacijaSobe = rezervacijaSobaService.GetAll().Where(x => x.SobaID == soba.Id);

					foreach(var rez in rezervacijaSobe)
					{
						var rezervacija = rezervacijaRepository.GetAll().Where(x => x.Id == rez.RezervacijaID);

						foreach(var r in rezervacija)
						{
							if (r != null)
							{
                                var rezervacijaReturn = new RezervacijaReturnVM
                                {
									NazivHotela=hotel.Naziv,
                                    DatumRezervacije = r.DatumRezervacije.ToShortDateString(),
                                    DatumCheckIn = r.DatumCheckIn.ToShortDateString(),
                                    DatumCheckOut = r.DatumCheckOut.ToShortDateString(),
                                    BrojGostiju = r.BrojGostiju,
                                    BrojDjece = r.BrojDjece,
                                    Cijena = r.Cijena
                                };

								returnLista.Add(rezervacijaReturn);
                            }
						}
					}
				}
			}

			return returnLista;

        }

		public void UpdateCijenu(int id, float cijena)
		{
			var rezervacija=rezervacijaRepository.GetAll().Where(r => r.Id == id).FirstOrDefault();
			if (rezervacija == null)
				return;
			rezervacija.Cijena += cijena;
			rezervacijaRepository.Update(rezervacija);
		}
	}
}
