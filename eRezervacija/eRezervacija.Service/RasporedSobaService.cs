using eRezervacija.Core;
using eRezervacija.Repository;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eRezervacija.Service
{
	public interface IRasporedSobaService
	{
		void AddRoom(int sobaId);
		void Rezervisi(DateTime checkIn, DateTime checkOut, int sobaId);
		List<RasporedSoba> RasporedZaSobu(int sobaId);
	}
	public class RasporedSobaService : IRasporedSobaService
	{
		IRepository<RasporedSoba> rasporedSobaRepository;
		public RasporedSobaService(IRepository<RasporedSoba> rasporedSobaRepository)
		{
			this.rasporedSobaRepository = rasporedSobaRepository;
		}

		public void AddRoom(int sobaId)
		{
			for (int i = 1; i <= 365; i++)
			{
				var redak = new RasporedSoba()
				{
					SobaId = sobaId,
					Datum = new DateTime(DateTime.Now.Year, 1, 1).AddDays(i - 1),
					Rezervisana = false,
				};
				rasporedSobaRepository.Add(redak);
			}
		}

		public List<RasporedSoba> RasporedZaSobu(int sobaId)
		{
			return rasporedSobaRepository.GetAll().Where(rs=>rs.SobaId == sobaId).ToList();
		}

		public void Rezervisi(DateTime checkIn, DateTime checkOut, int sobaId)
		{
			var rasporedZaSobu = rasporedSobaRepository.GetAll().Where(s => s.SobaId == sobaId).ToList();
			for (int i = 0; i < 365; i++)
			{
				if (rasporedZaSobu[i].Datum >= checkIn && rasporedZaSobu[i].Datum < checkOut)
					rasporedZaSobu[i].Rezervisana = true;
				if (rasporedZaSobu[i].Datum > checkOut)
					break;
			}
		}
	}
}
