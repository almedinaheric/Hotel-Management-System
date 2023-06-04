using eRezervacija.Core.Autentikacija;

namespace eRezervacija.API.Helpers
{
	public class EmailLog
	{
		public static void uspjesnoLogiranKorisnik(AutentifikacijaToken token, HttpContext httpContext)
		{
			var logiraniKorisnik = token.korisnik;
			if (logiraniKorisnik.Uloga=="Gost" || logiraniKorisnik.Uloga == "Vlasnik" || logiraniKorisnik.Uloga=="Admin")
			{
				var poruka = $"Postovani {logiraniKorisnik.Ime+" "+logiraniKorisnik.Prezime}, <br> " +
							  $"Code za 2F je <bor>" +
							  $"{token.twoFCode}<br>" +
							  $"Login info {DateTime.Now}";

				//u pravilu trebalo bi se slati valjda na mail koji je unio korisnik
				//EmailSender.Posalji("bopiv23504@carpetra.com", "Code za 2F autorizaciju", poruka, true);
                EmailSender.Posalji("cisejay850@introace.com", "Code za 2F autorizaciju", poruka, true);

            }
        }
	}
}
