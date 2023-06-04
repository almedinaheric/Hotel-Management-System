using eRezervacija.Core;
using eRezervacija.Core.ViewModels;
using eRezervacija.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eRezervacija.Service
{
	public interface ITransakcijaService
	{
		Transakcija AddTransakcija(TransakcijaAddVM transakcija);
	}
	public class TransakcijaService : ITransakcijaService
	{
		IRepository<Transakcija> transakcijaRepository;
        public TransakcijaService(IRepository<Transakcija> transakcijaRepository)
        {
			this.transakcijaRepository = transakcijaRepository;            
        }

		public Transakcija AddTransakcija(TransakcijaAddVM transakcija)
		{
			var novaTransakcija = new Transakcija() 
			{
				RezervacijaId=transakcija.RezervacijaId,
				HotelId=transakcija.HotelId,
				BrojRacuna=transakcija.BrojRacuna,
				KreditnaKarticaId=transakcija.KreditnaKarticaId,
				DatumUplate=DateTime.Now,
				Cijena=transakcija.Cijena,
			};
			transakcijaRepository.Add(novaTransakcija);
			return novaTransakcija;
		}
	}
}
