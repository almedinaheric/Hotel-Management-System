using System;
using eRezervacija.Core;
using eRezervacija.Repository;

namespace eRezervacija.Service
{
	public interface ISobaService
	{
		void Add(Soba obj);
		IEnumerable<Soba> GetAll();
		Soba GetBySobaID(int id);
		IEnumerable<Soba> GetByHotelId(int id);
		Hotel GetById(int id);
		void Remove(Soba obj);
		void RemoveBySobaId(int sobaId);
        void RemoveByHotelId(int hotelId);
    }

	public class SobaService : ISobaService
	{
		IRepository<Soba> sobaRepository;
		IHotelService hotelService;
		ISlikaService slikaService;

		public SobaService(IRepository<Soba> sobaRepository, IHotelService hotelService,ISlikaService slikaService)
		{
			this.sobaRepository = sobaRepository;
			this.hotelService = hotelService;
			this.slikaService = slikaService;
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
			return sobaRepository.GetAll().Where(x => x.HotelID == hotelId);
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
            //if (sveSobe != null)
            //{
            //	foreach(var soba in sveSobe)
            //	{
            //		slikaService.RemoveBySobaId(soba.Id);
            //		sobaRepository.RemoveRange(sveSobe);
            //	}
            //}
        }
    }

}


