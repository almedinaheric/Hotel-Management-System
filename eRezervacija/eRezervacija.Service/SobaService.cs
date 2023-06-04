using System;
using eRezervacija.Core;
using eRezervacija.Repository;
using eRezervacija.Repository.Repositories;
using Microsoft.EntityFrameworkCore.SqlServer.Query.Internal;

namespace eRezervacija.Service
{
	public interface ISobaService
	{
		void Add(Soba obj);
		int GetSobaIdBySoba(Soba obj);
		IEnumerable<Soba> GetAll();
		Soba GetBySobaID(int id);
		IEnumerable<Soba> GetByHotelId(int id);
		Hotel GetById(int id);
		void Remove(Soba obj);
		void RemoveBySobaId(int sobaId);
		void RemoveByHotelId(int hotelId);
		public IEnumerable<Soba> GetForKonfiguracija(int hotelId, DateTime dolazak, DateTime odlazak);
		public bool Slobodna(Soba obj, DateTime dolazak, DateTime odlazak);
		public IEnumerable<Soba> GetSobeByName(string name, int brojSoba);
	}

	public class SobaService : ISobaService
	{
		ISobaRepository sobaRepository;
		//IRepository<Soba> sobaRepository;
		IHotelService hotelService;
		ISlikaService slikaService;
		IRasporedSobaService rasporedSobaService;

		public SobaService(ISobaRepository sobaRepository, IHotelService hotelService, ISlikaService slikaService, IRasporedSobaService rasporedSobaService)
		{
			this.sobaRepository = sobaRepository;
			this.hotelService = hotelService;
			this.slikaService = slikaService;
			this.rasporedSobaService = rasporedSobaService;
		}

		public void Add(Soba obj)
		{
			sobaRepository.Add(obj);
		}

		public IEnumerable<Soba> GetAll()
		{
			return sobaRepository.GetAll();
		}


		public Soba GetBySobaID(int id)
		{
			return sobaRepository.GetAll().Where(x => x.Id == id).FirstOrDefault();
		}

		public void Remove(Soba obj)
		{
			sobaRepository.Remove(obj);
		}

		public IEnumerable<Soba> GetByHotelId(int hotelId)
		{
			return sobaRepository.GetAllWithInclude().Where(x => x.HotelID == hotelId);
			//return sobaRepository.GetAllWithInclude().Where(x => x.HotelID == hotelId);
		}

		public IEnumerable<Soba> GetForKonfiguracija(int hotelId, DateTime dolazak, DateTime odlazak)
		{
			var sobe = sobaRepository.GetAllWithInclude().Where(soba => soba.HotelID == hotelId);
			var returnSobe = new List<Soba>();
			foreach (Soba obj in sobe)
			{
				if(Slobodna(obj,dolazak, odlazak))
					returnSobe.Add(obj);
			}
			return returnSobe;
		}
		public bool Slobodna(Soba obj, DateTime dolazak, DateTime odlazak)
		{
			var rasporedSobe = rasporedSobaService.RasporedZaSobu(obj.Id);
			rasporedSobe = rasporedSobe.Where(rs => rs.Datum >= dolazak && rs.Datum <= odlazak).ToList();
			for (int i = 0; i < rasporedSobe.Count; i++)
			{
				if (rasporedSobe[i].Rezervisana)
					return false;
			}
			return true;
		}

		public Hotel GetById(int id)
		{
			return hotelService.GetAll().Where(h => h.Id == id).FirstOrDefault();
		}

		public void RemoveBySobaId(int sobaId)
		{
			sobaRepository.RemoveById(sobaId);
		}

		public void RemoveByHotelId(int hotelId)
		{
			var sveSobe = GetByHotelId(hotelId);
			sobaRepository.RemoveRange(sveSobe);
		}

		public int GetSobaIdBySoba(Soba obj)
		{
			return sobaRepository.GetAll().Where(s => s == obj).FirstOrDefault().Id;
		}

		public IEnumerable<Soba> GetSobeByName(string name, int brojSoba)
		{
			var listaSoba=sobaRepository.GetAll().Where(s => s.Naziv == name).Take(brojSoba).ToList();
			return listaSoba;
		}
	}

}


