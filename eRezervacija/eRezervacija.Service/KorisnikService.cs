using eRezervacija.Core;
using eRezervacija.Repository;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;

namespace eRezervacija.Service
{
	public interface IKorisnikService
	{
		void Add(Korisnik obj);
		Korisnik Get(Korisnik obj);
		Korisnik GetByLogin(string username, string password,string uloga);
		bool CheckIfExisting(string username);
		IEnumerable<Korisnik> GetAll();
		void UpdateKorisnik(Korisnik obj);
		Korisnik GetByKorisnikID(int id);
        Korisnik GetByEmail(string email);
		void SetPasswordResetToken(int korisnikId, string token);
		Korisnik GetByPasswordResetToken(string token);
    }
	public class KorisnikService : IKorisnikService
	{
		IRepository<Korisnik> korisnikRepository;
		public KorisnikService(IRepository<Korisnik> korisnikRepository)
		{
			this.korisnikRepository = korisnikRepository;
		}

		public void Add(Korisnik obj)
		{
			korisnikRepository.Add(obj);
		}

		public IEnumerable<Korisnik> GetAll()
		{
			return korisnikRepository.GetAll();
		}

		public Korisnik Get(Korisnik obj)
		{
			return korisnikRepository.GetAll().Where(x => x.Username==obj.Username).First();
		}

        public Korisnik GetByKorisnikID(int id)
        {
            return korisnikRepository.GetAll().Where(x => x.Id == id).FirstOrDefault();
        }

        public Korisnik GetByEmail(string email)
        {
            return korisnikRepository.GetAll().Where(x => x.Email==email).FirstOrDefault();
        }

        public Korisnik GetByLogin(string username, string password, string uloga)
		{
			//je li ovo najbolja implementacija?
			Korisnik? logiraniKorisnik=korisnikRepository.GetAll().FirstOrDefault(k=>k.Username==username && k.Password==password && k.Uloga==uloga);
			return logiraniKorisnik;
		}

		public bool CheckIfExisting(string username)
		{
			Korisnik? postojeci = korisnikRepository.GetAll().Where(x => x.Username == username).FirstOrDefault();
			return !(postojeci == null);
			//vrati true ako je username vec postojeci
		}

        public void UpdateKorisnik(Korisnik obj)
        {
			korisnikRepository.Update(obj);
        }

		public void SetPasswordResetToken(int korisnikId, string token)
		{
			var korisnik = korisnikRepository.GetAll().Where(k => k.Id == korisnikId).FirstOrDefault();
			if (korisnik != null)
			{
				korisnik.PasswordResetToken = token;
				korisnikRepository.Update(korisnik);
			}
		}

		public Korisnik GetByPasswordResetToken(string token)
		{
			return korisnikRepository.GetAll().Where(t => t.PasswordResetToken == token).FirstOrDefault();
		}
    }
}