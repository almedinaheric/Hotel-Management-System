using eRezervacija.API.Helpers;
using eRezervacija.API.ViewModels;
using eRezervacija.Core;
using eRezervacija.Service;
using Microsoft.AspNetCore.Mvc;
using eRezervacija.Core.Autentikacija;
using eRezervacija.Core.ViewModels;
using System.Web;

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
		IRasporedSobaService rasporedSobaService;
		ISobaService sobaService;
		ITransakcijaService transakcijaService;
		INacinPlacanjaService nacinPlacanjaService;
		IAuthTokenService authTokenService;

		public KorisnikController(IKorisnikService korisnikService, IGostService gostService, IAuthTokenService tokenService,
			IAdminService adminService, IVlasnikService vlasnikService, IKarticaService karticaService, IRecenzijaService recenzijaService,
			IRezervacijaService rezervacijaService, IRezervacijaSobaService rezervacijaSobaService, IHotelService hotelService, IFAQService faqService,
			IRasporedSobaService rasporedSobaService, ITransakcijaService transakcijaService, ISobaService sobaService, IAuthTokenService authTokenService, INacinPlacanjaService nacinPlacanjaService)

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
			this.rasporedSobaService = rasporedSobaService;
			this.transakcijaService = transakcijaService;
			this.sobaService = sobaService;
			this.nacinPlacanjaService = nacinPlacanjaService;
			this.authTokenService = authTokenService;
		}

		[HttpGet("{kod}")]
		public ActionResult<AuthTokenExtension.LoginInformacije> Otkljucaj(string kod)
		{
			var korisnickiNalog = HttpContext.GetLoginInfo().korisnickiNalog;

			if (korisnickiNalog == null)
			{
				return BadRequest("Korisnik nije logiran");
			}

			var token = authTokenService.Get(kod, korisnickiNalog.Id);
			if (token != null)
			{
				authTokenService.Otkljucaj(token);
				return Ok(new AuthTokenExtension.LoginInformacije(token));
			}

			return BadRequest("Pogresan URL");
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
				Datum_rodjenja = gost.DatumRodjenja.AddDays(1),
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
		[HttpPut("{korisnikId}")]
		public ActionResult<Gost> UpdateGost(int korisnikId, RegistracijaGostVM podaci)
		{
			var updateKorisnik = korisnikService.GetByKorisnikID(korisnikId);
			var updateGost = gostService.GetByKorisnikID(korisnikId);

			if (updateKorisnik == null) { return NotFound(); }
			if (updateGost == null) { return NotFound(); }

			updateKorisnik.Uloga = "Gost";
			updateKorisnik.Ime = podaci.Ime;
			updateKorisnik.Prezime = podaci.Prezime;
			updateKorisnik.Spol = podaci.Spol;
			updateKorisnik.Datum_rodjenja = podaci.DatumRodjenja.AddDays(1);
			updateKorisnik.Email = podaci.Email;
			updateKorisnik.Broj_telefona = podaci.BrojTelefona;
			updateKorisnik.DatumPromjene = DateTime.Now;
			korisnikService.UpdateKorisnik(updateKorisnik);

			updateGost.korisnik = updateKorisnik;
			gostService.Update(updateGost);

			return updateGost;
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
			string twoFCode = TokenGenerator.Generate(4);

			//dodavanje novog zapisa u tabelu AutentifikacijaToken za taj login i string
			var noviToken = new AutentifikacijaToken()
			{
				ipAdresa = Request.HttpContext.Connection.RemoteIpAddress?.ToString(),
				Vrijednost = randomString,
				korisnik = logiraniKorisnik,
				gost = gostService.GetByKorisnikID(logiraniKorisnik.Id),
				twoFCode = twoFCode,
			};
			tokenService.Add(noviToken);

			EmailLog.uspjesnoLogiranKorisnik(noviToken, Request.HttpContext);
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
				Datum_rodjenja = admin.DatumRodjenja.AddDays(1),
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
			string twoFCode = TokenGenerator.Generate(4);

			var noviToken = new AutentifikacijaToken()
			{
				ipAdresa = Request.HttpContext.Connection.RemoteIpAddress?.ToString(),
				Vrijednost = randomString,
				korisnik = logiraniKorisnik,
				admin = adminService.GetByKorisnikID(logiraniKorisnik.Id),
				twoFCode = twoFCode,
			};
			tokenService.Add(noviToken);

			EmailLog.uspjesnoLogiranKorisnik(noviToken, Request.HttpContext);
			return new AuthTokenExtension.LoginInformacije(noviToken);
		}
		[HttpPut("{korisnikId}")]
		public ActionResult<Admin> UpdateAdmin(int korisnikId, RegistracijaAdminVM podaci)
		{
			var updateKorisnik = korisnikService.GetByKorisnikID(korisnikId);
			var updateAdmin = adminService.GetByKorisnikID(korisnikId);

			if (updateKorisnik == null) { return NotFound(); }
			if (updateAdmin == null) { return NotFound(); }

			updateKorisnik.Uloga = "Admin";
			updateKorisnik.Ime = podaci.Ime;
			updateKorisnik.Prezime = podaci.Prezime;
			updateKorisnik.Spol = podaci.Spol;
			updateKorisnik.Datum_rodjenja = podaci.DatumRodjenja.AddDays(1);
			updateKorisnik.Email = podaci.Email;
			updateKorisnik.Broj_telefona = podaci.BrojTelefona;
			updateKorisnik.DatumPromjene = DateTime.Now;
			korisnikService.UpdateKorisnik(updateKorisnik);

			updateAdmin.korisnik = updateKorisnik;
			adminService.Update(updateAdmin);

			return updateAdmin;
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
				Datum_rodjenja = vlasnik.DatumRodjenja.AddDays(1),
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
			updateKorisnik.Datum_rodjenja = podaci.DatumRodjenja.AddDays(1);
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

		[HttpGet("{vlasnikId}")]
		public Vlasnik GetVlasnikByVlasnikId(int vlasnikId)
		{
			return vlasnikService.GetByVlasnikId(vlasnikId);
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

		[HttpPost("update-password")]
		public IActionResult UpdateForgotPassword([FromQuery] string token, string password)
		{
			var korisnik = korisnikService.GetByPasswordResetToken(token);

			if (korisnik == null)
			{
				return NotFound();
			}

			korisnik.Password = password;
			korisnikService.UpdateKorisnik(korisnik);

			return Ok();
		}


		[HttpPost]
		public ActionResult ForgotPassword([FromQuery] string email)
		{
			var korisnik = korisnikService.GetByEmail(email);

			if (korisnik == null)
				return NotFound();

			var token = Guid.NewGuid().ToString();
			korisnikService.SetPasswordResetToken(korisnik.Id, token);

			var resetPasswordUrl = $"http://localhost:65375/update-password?token={HttpUtility.UrlEncode(token)}";
			//var emailBody = $"Click this link to reset your password: {resetPasswordUrl}";
			var emailBody = ResetPasswordEmailBody.EmailBody(resetPasswordUrl, korisnik.Ime, korisnik.Prezime);

			EmailSender.Posalji("yilafi6668@jwsuns.com", "Password Recovery", emailBody, true);
			return Ok();
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
			string twoFCode = TokenGenerator.Generate(4);

			//dodavanje novog zapisa u tabelu AutentifikacijaToken za taj login i string
			var noviToken = new AutentifikacijaToken()
			{
				ipAdresa = Request.HttpContext.Connection.RemoteIpAddress?.ToString(),
				Vrijednost = randomString,
				korisnik = logiraniKorisnik,
				vlasnik = vlasnikService.GetByKorisnikID(logiraniKorisnik.Id),
				twoFCode = twoFCode
			};
			tokenService.Add(noviToken);
			EmailLog.uspjesnoLogiranKorisnik(noviToken, Request.HttpContext);
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
		public bool CheckIfGuidExists(int hotelId, Guid brojRezervacije)
		{
			var rezervacija = rezervacijaService.GetAll().Where(x => x.BrojRezervacije == brojRezervacije).FirstOrDefault();
			if (rezervacija == null)
				return false;
			var sobarezervacija = rezervacijaSobaService.GetByRezervacijaId(rezervacija.Id).FirstOrDefault();
			var hotelID = sobaService.GetBySobaID(sobarezervacija.SobaID).HotelID;
			if (hotelID == hotelId)
				return true;
			else
				return false;
		}


		[HttpPost]
		public Recenzija DodajRecenziju([FromBody] RecenzijaAddVM recenzija, Guid brojRezervacije)
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

			if (recenzijeHotela != null && recenzijeHotela.Count() > 0)
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
		public Rezervacija RezervisiSmjestaj([FromBody] RezervacijaAddVM rezervacija)
		{
			var novaRezervacija = rezervacijaService.Add(rezervacija);

			foreach (var kombinacija in rezervacija.kombinacije)
			{
				var listaSoba = sobaService.GetSobeByName(kombinacija.Naziv, kombinacija.Broj);
				foreach (var soba in listaSoba)
				{
					var novaRezervacijaSoba = new RezervacijaSoba()
					{
						rezervacija = novaRezervacija,
						SobaID = soba.Id
					};
					rezervacijaService.UpdateCijenu(novaRezervacija.Id, soba.UkupnaCijena);
					rasporedSobaService.Rezervisi(rezervacija.DatumCheckIn, rezervacija.DatumCheckOut, soba.Id);
					rezervacijaSobaService.Add(novaRezervacijaSoba);
				}
			}
			return novaRezervacija;
		}

		[HttpPost]
		public Transakcija DodajTransakciju(TransakcijaAddVM transakcija)
		{
			return transakcijaService.AddTransakcija(transakcija);
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
			var pitanjeZaOdgovor = faqService.Find(pitanjeId);
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


		[HttpPost]
		public NacinPlacanja AddNacinPlacanja(NacinPlacanja nacin)
		{
			var noviNacin = new NacinPlacanja()
			{
				Opis = nacin.Opis
			};
			nacinPlacanjaService.Add(noviNacin);
			return noviNacin;
		}

		[HttpGet]
		public IEnumerable<NacinPlacanja> GetAllNacinPlacanja()
		{
			return nacinPlacanjaService.GetAll();
		}

		[HttpGet("{nacinId}")]
		public NacinPlacanja GetNacinPlacanjaById(int nacinId)
		{
			return nacinPlacanjaService.GetByNacinPlacanjaId(nacinId);
		}
	}
}
