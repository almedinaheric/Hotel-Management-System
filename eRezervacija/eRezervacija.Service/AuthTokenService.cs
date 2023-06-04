using eRezervacija.Core.Autentikacija;
using eRezervacija.Repository;
using eRezervacija.Repository.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace eRezervacija.Service
{
	public interface IAuthTokenService
	{
		void Otkljucaj(AutentifikacijaToken token);
		AutentifikacijaToken Get(string kod, int id);
		void Add(AutentifikacijaToken obj);
		void Remove(AutentifikacijaToken obj);
	}
	public class AuthTokenService : IAuthTokenService
	{
		IRepository<AutentifikacijaToken> tokenRepository;
		//ITokenRepository tokenRepository;
		public AuthTokenService(IRepository<AutentifikacijaToken> tokenRepository)
		{
			this.tokenRepository = tokenRepository;
		}

		public void Add(AutentifikacijaToken obj)
		{
			tokenRepository.Add(obj);
		}

		public AutentifikacijaToken Get(string kod, int id)
		{
			return tokenRepository.GetAll().Where(s => s.twoFCode == kod && s.korisnik.Id == id).FirstOrDefault();
		}

		public void Otkljucaj(AutentifikacijaToken token)
		{
			token.twoFJelOtkljucano = true;
			tokenRepository.Update(token);
		}

		public void Remove(AutentifikacijaToken obj)
		{
			tokenRepository.Remove(obj);
		}
	}
}
