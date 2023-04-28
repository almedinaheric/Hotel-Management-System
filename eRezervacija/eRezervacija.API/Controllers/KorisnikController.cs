using eRezervacija.API.Helpers;
using eRezervacija.API.ViewModels;
using eRezervacija.Core;
using eRezervacija.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using eRezervacija.Repository;
using eRezervacija.Core.Autentikacija;
using eRezervacija.Core.ViewModels;

namespace eRezervacija.API.Controllers
{
	[Route("api/[controller]/[action]")]
	[ApiController]
	public class KorisnikController : ControllerBase
	{
		IKorisnikService korisnikService;
		IGostService gostService;
		IAuthTokenService tokenService;
		IAdminService adminService;
		IVlasnikService vlasnikService;
		IKarticaService karticaService;
		IRecenzijaService recenzijaService;
		IRezervacijaService rezervacijaService;
		IRezervacijaSobaService rezervacijaSobaService;
		IHotelService hotelService;
		IFAQService faqService;

		public KorisnikController(IKorisnikService korisnikService, IGostService gostService, IAuthTokenService tokenService,
			IAdminService adminService, IVlasnikService vlasnikService, IKarticaService karticaService, IRecenzijaService recenzijaService,
			IRezervacijaService rezervacijaService, IRezervacijaSobaService rezervacijaSobaService,IHotelService hotelService, IFAQService faqService)
		{
			this.korisnikService = korisnikService;
			this.gostService = gostService;
			this.tokenService = tokenService;
			this.adminService = adminService;
			this.vlasnikService = vlasnikService;
			this.karticaService = karticaService;
			this.recenzijaService = recenzijaService;
			this.rezervacijaService = rezervacijaService;
			this.rezervacijaSobaService = rezervacijaSobaService;
			this.hotelService = hotelService;
			this.faqService = faqService;
		}

		[HttpPost]
		public Gost RegistracijaGost(RegistracijaGostVM gost)
		{
			if (korisnikService.CheckIfExisting(gost.Username))
				return null;
			var temp = new Korisnik()
			{
				Uloga = "Gost",
				Ime = gost.Ime,
				Prezime = gost.Prezime,
				Spol = gost.Spol,
				Datum_rodjenja = gost.DatumRodjenja,
				Email = gost.Email,
				Broj_telefona = gost.BrojTelefona,
				Username = gost.Username,
				Password = gost.Password,
				DatumKreiranja = DateTime.Now,
				DatumPromjene = DateTime.Now,
			};
			korisnikService.Add(temp);
			var noviGost = new Gost()
			{
				korisnik = temp,
				kartica = null
			};
			gostService.Add(noviGost);
			return noviGost;
		}
		[HttpPost]
		public ActionResult<AuthTokenExtension.LoginInformacije> LoginGost([FromBody] LoginVM x)
		{
			//provjeriti login
			Korisnik? logiraniKorisnik = korisnikService.GetByLogin(x.Username, x.Password, "Gost");
			if (logiraniKorisnik == null)
			{
				//pogresan username ili password
				return new AuthTokenExtension.LoginInformacije(null);
			}

			//generisanje random stringa
			string randomString = TokenGenerator.Generate(10);

			//dodavanje novog zapisa u tabelu AutentifikacijaToken za taj login i string
			var noviToken = new AutentifikacijaToken()
			{
				ipAdresa = Request.HttpContext.Connection.RemoteIpAddress?.ToString(),
				Vrijednost = randomString,
				korisnik = logiraniKorisnik,
				gost = gostService.GetByKorisnikID(logiraniKorisnik.Id),
			};
			tokenService.Add(noviToken);
			return new AuthTokenExtension.LoginInformacije(noviToken);
		}
		[HttpGet]
		public IEnumerable<Gost> GetAllGost()
		{
			return gostService.GetAll();
		}

		
		[HttpPost]
		public Admin RegistracijaAdmin(RegistracijaAdminVM admin)
		{
			if (korisnikService.CheckIfExisting(admin.Username))
				return null;
			var temp = new Korisnik()
			{
				Uloga = "Admin",
				Ime = admin.Ime,
				Prezime = admin.Prezime,
				Spol = admin.Spol,
				Datum_rodjenja = admin.DatumRodjenja,
				Email = admin.Email,
				Broj_telefona = admin.BrojTelefona,
				Username = admin.Username,
				Password = admin.Password,
				DatumKreiranja = DateTime.Now,
				DatumPromjene = DateTime.Now,
			};
			korisnikService.Add(temp);
			var noviAdmin = new Admin()
			{
				korisnik = temp
			};
			adminService.Add(noviAdmin);
			return noviAdmin;
		}
		[HttpPost]
		public ActionResult<AuthTokenExtension.LoginInformacije> LoginAdmin([FromBody] LoginVM x)
		{
			Korisnik? logiraniKorisnik = korisnikService.GetByLogin(x.Username, x.Password, "Admin");
			if (logiraniKorisnik == null)
			{
				return new AuthTokenExtension.LoginInformacije(null);
			}
			string randomString = TokenGenerator.Generate(10);

			var noviToken = new AutentifikacijaToken()
			{
				ipAdresa = Request.HttpContext.Connection.RemoteIpAddress?.ToString(),
				Vrijednost = randomString,
				korisnik = logiraniKorisnik,
				admin = adminService.GetByKorisnikID(logiraniKorisnik.Id),
			};
			tokenService.Add(noviToken);
			return new AuthTokenExtension.LoginInformacije(noviToken);
		}
		[HttpGet]
		public IEnumerable<Admin> GetAllAdmin()
		{
			return adminService.GetAll();
		}


		[HttpPost]
		public Vlasnik RegistracijaVlasnik(RegistracijaVlasnikVM vlasnik)
		{
			if (korisnikService.CheckIfExisting(vlasnik.Username))
				return null;
			
			var temp = new Korisnik()
			{
				Uloga = "Vlasnik",
				Ime = vlasnik.Ime,
				Prezime = vlasnik.Prezime,
				Spol = vlasnik.Spol,
				Datum_rodjenja = vlasnik.DatumRodjenja,
				Email = vlasnik.Email,
				Broj_telefona = vlasnik.BrojTelefona,
				Username = vlasnik.Username,
				Password = vlasnik.Password,
				DatumKreiranja = DateTime.Now,
				DatumPromjene = DateTime.Now,
			};
			korisnikService.Add(temp);
			var noviVlasnik = new Vlasnik()
			{
				korisnik = temp,
				//KorisnikID = korisnikService.Get(temp).Id,
				BrojBankovnogRacuna = vlasnik.BrojBankovnogRacuna,
				BrojLicneKarte = vlasnik.BrojLicneKarte
				//VlasnickiList = vlasnik.VlasnickiList
			};
			vlasnikService.Add(noviVlasnik);
			return noviVlasnik;
        }

        [HttpPost("{korisnikId}")]
        public ActionResult<Vlasnik> UpdatePodaciMojProfilVlasnik(int korisnikId, MojProfilVlasnikUpdateVM podaci)
		{
            var updateKorisnik = korisnikService.GetByKorisnikID(korisnikId);
            var updateVlasnik = vlasnikService.GetByKorisnikID(korisnikId);

			if (updateKorisnik == null) { return NotFound(); }
            if (updateVlasnik == null) { return NotFound(); }

            updateKorisnik.Uloga = "Vlasnik";
            updateKorisnik.Ime = podaci.Ime; 
            updateKorisnik.Prezime = podaci.Prezime; 
            updateKorisnik.Spol = podaci.Spol; 
            updateKorisnik.Datum_rodjenja = podaci.DatumRodjenja; 
            updateKorisnik.Email = podaci.Email; 
            updateKorisnik.Broj_telefona = podaci.BrojTelefona; 
            updateKorisnik.DatumPromjene = DateTime.Now;
            korisnikService.UpdateKorisnik(updateKorisnik);

            updateVlasnik.korisnik = updateKorisnik;
            updateVlasnik.BrojBankovnogRacuna = podaci.BrojBankovnogRacuna;
            updateVlasnik.BrojLicneKarte = podaci.BrojLicneKarte;
            vlasnikService.UpdateVlasnik(updateVlasnik);

            return updateVlasnik;
        }

        [HttpPost("{korisnikId}")]
        public ActionResult<Korisnik> ChangePassword(int korisnikId, ChangePasswordVM password)
		{
            var updateKorisnik = korisnikService.GetByKorisnikID(korisnikId);
            if (updateKorisnik == null) { return NotFound(); }

			if (updateKorisnik.Password == password.OldPassword)
			{
				updateKorisnik.Password = password.NewPassword;
				korisnikService.UpdateKorisnik(updateKorisnik);
				return updateKorisnik;
			}

            return BadRequest("Trenutni password nije tacan.");
        }

        [HttpPost]
		public ActionResult<AuthTokenExtension.LoginInformacije> LoginVlasnik([FromBody] LoginVM x)
		{
			//provjeriti login
			Korisnik? logiraniKorisnik = korisnikService.GetByLogin(x.Username, x.Password, "Vlasnik");
			if (logiraniKorisnik == null)
			{
				//pogresan username ili password
				return new AuthTokenExtension.LoginInformacije(null);
			}

			//generisanje random stringa
			string randomString = TokenGenerator.Generate(10);

			//dodavanje novog zapisa u tabelu AutentifikacijaToken za taj login i string
			var noviToken = new AutentifikacijaToken()
			{
				ipAdresa = Request.HttpContext.Connection.RemoteIpAddress?.ToString(),
				Vrijednost = randomString,
				korisnik = logiraniKorisnik,
				vlasnik = vlasnikService.GetByKorisnikID(logiraniKorisnik.Id),
			};
			tokenService.Add(noviToken);
			return new AuthTokenExtension.LoginInformacije(noviToken);
		}
		[HttpGet]
		public IEnumerable<Vlasnik> GetAllVlasnik()
		{
			return vlasnikService.GetAll();
		}

		[HttpPost]
		public ActionResult Logout()
		{
			AutentifikacijaToken autentifikacijaToken = HttpContext.GetAuthToken();

			if (autentifikacijaToken == null)
				return Ok();

			tokenService.Remove(autentifikacijaToken);
			return Ok();
		}
		[HttpGet]
		public IEnumerable<Korisnik> GetAllKorisnik()
		{
			return korisnikService.GetAll();
		}

		
		[HttpPost]
		//[Autorizacija(Admin: false, Vlasnik: false, Gost: true)]
		public KreditnaKartica PoveziKarticu(int korisnikId, [FromBody] KreditnaKarticaVM kartica)
		{
			var novakartica = new KreditnaKartica()
			{
				BrojKartice = kartica.BrojKartice,
				CVV = kartica.CVV,
				DatumIsteka = kartica.DatumIsteka
			};
			karticaService.Add(novakartica);
			var temp = gostService.GetByKorisnikID(korisnikId);
			temp.kartica = novakartica;
			gostService.Update(temp);
			return novakartica;
		}
		[HttpDelete]
		public KreditnaKartica IzbrisiKarticu(int korisnikId)
		{
			var tempKorisnik = gostService.GetByKorisnikID(korisnikId);
			var tempKartica = tempKorisnik.kartica;
			tempKorisnik.kartica = null;
			gostService.Update(tempKorisnik);
			karticaService.Remove(tempKartica);
			return tempKartica;
		}
		[HttpGet]
		public KreditnaKartica GetKreditnaKarticaByKorisnikID(int korisnikId)
		{
			return gostService.GetByKorisnikID(korisnikId).kartica;
		}
		
		
		[HttpPost]
		public Recenzija DodajRecenziju([FromBody] RecenzijaAddVM recenzija)
		{
			var novaRecenzija = new Recenzija()
			{
				HotelId = recenzija.HotelId,
				GostId = recenzija.GostId,
				Ocjena = recenzija.Ocjena,
				Komentar = recenzija.Komentar
			};
			recenzijaService.Add(novaRecenzija);

			var hotel = hotelService.GetByHotelID(recenzija.HotelId);
			var recenzijeHotela = recenzijaService.GetByHotelId(recenzija.HotelId);

			if(recenzijeHotela!=null && recenzijeHotela.Count() > 0)
			{
				float sumaOcjena = recenzijeHotela.Sum(x => x.Ocjena);
				float prosjek = sumaOcjena / recenzijeHotela.Count();
				hotel.ProsjecnaOcjena = (float)Math.Round(prosjek, 2);
				hotelService.Update(hotel);
			}

            return novaRecenzija;
		}

		[HttpGet]
		public List<RecenzijaReturnVM> GetRecenzijeByGostId(int gostId)
		{
			return recenzijaService.GetByGostId(gostId).ToList();
		}

        [HttpGet]
        public List<RecenzijaByHotelReturnVM> GetRecenzijeByHotelId(int hotelId)
        {
            return recenzijaService.GetByHotelId(hotelId).ToList();
        }

        [HttpGet]
		public List<Recenzija> GetAllRecenzije()
		{
			return recenzijaService.GetAll().ToList();
		}

		[HttpPost]
		public Rezervacija RezervisiSmjestaj(RezervacijaAddVM rezervacija)
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
				NacinPlacanja = rezervacija.NacinPlacanja,
				Cijena = rezervacija.Cijena,
			};
			var novaRezervacijaSoba = new RezervacijaSoba()
			{
				rezervacija = novaRezervacija,
				SobaID = rezervacija.SobaId
			};
			rezervacijaService.Add(novaRezervacija);
			rezervacijaSobaService.Add(novaRezervacijaSoba);
			return novaRezervacija;
		}

		[HttpGet]
		public List<RezervacijaReturnVM> GetRezervacijeByGostId(int gostId)
		{
			return rezervacijaService.GetByGostId(gostId).ToList();
		}

        [HttpGet]
        public IEnumerable<RezervacijaReturnVM> GetRezervacijeByVlasnikId(int vlasnikId)
        {
			return rezervacijaService.GetByVlasnikHotelaId(vlasnikId);
        }

        [HttpGet]
        public IEnumerable<Rezervacija> GetAllRezervacija()
        {
            return rezervacijaService.GetAll();
        }

		[HttpPost]
		public FAQ PostaviPitanje(FAQAddVM pitanje)
		{
			return faqService.Add(pitanje);
		}
		[HttpGet]
		public List<FAQ> GetPitanjaForGost(int gostId)
		{
			return faqService.GetByGostId(gostId);
		}
		[HttpPut("{pitanjeId}")]
		public FAQ OdgovoriPitanje(int pitanjeId, string tekstOdgovora)
		{
			var pitanjeZaOdgovor=faqService.Find(pitanjeId);
			pitanjeZaOdgovor.OdgovorPitanja = tekstOdgovora;
			pitanjeZaOdgovor.Odgovoreno = true;
			pitanjeZaOdgovor.DatumOdgovoreno = DateTime.Now;
			faqService.Update(pitanjeZaOdgovor);
			return pitanjeZaOdgovor;
		}
		[HttpGet]
		public List<FAQ> GetNeodgovorenaPitanja()
		{
			return faqService.GetNeodgovorenaPitanja();
		}
    }
}
