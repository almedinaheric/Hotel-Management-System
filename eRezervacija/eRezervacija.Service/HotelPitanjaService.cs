using System;
using eRezervacija.Core;
using eRezervacija.Core.ViewModels;
using eRezervacija.Repository;

namespace eRezervacija.Service
{
	public  interface IHotelPitanjaService
	{
        HotelPitanja Add(HotelPitanjaAddVM pitanje);
        void Update(HotelPitanja pitanje);
        void Delete(int id);
        HotelPitanja Find(int id);
        List<HotelPitanja> GetByHotelId(int hotelId);
        List<HotelPitanja> GetNeodgovorenaPitanjaZaHotel(int id);
        List<HotelPitanja> GetOdgovorenaPitanjaZaHotel(int id);
        List<HotelPitanja> GetPitanjaZaGosta(int id);
    }

    public class HotelPitanjaService:IHotelPitanjaService
	{
		IRepository<HotelPitanja> HotelPitanjaRepository;

		public HotelPitanjaService(IRepository<HotelPitanja> hotelPitanjaRepository)
		{
			HotelPitanjaRepository = hotelPitanjaRepository;
		}

		public HotelPitanja Add(HotelPitanjaAddVM pitanje)
        {
            var novoPitanje = new HotelPitanja()
            {
                HotelId = pitanje.HotelID,
                TekstPitanja = pitanje.TekstPitanja,
                GostId = pitanje.GostID,
                Odgovoreno = false
            };
            HotelPitanjaRepository.Add(novoPitanje);
            return novoPitanje;
        }

        public void Delete(int id)
        {
            var pitanje = HotelPitanjaRepository.Find(id);
            HotelPitanjaRepository.Remove(pitanje);
        }

        public HotelPitanja Find(int id)
        {
            return HotelPitanjaRepository.Find(id);
        }

        public List<HotelPitanja> GetByHotelId(int hotelId)
        {
            return HotelPitanjaRepository.GetAll().Where(p => p.HotelId == hotelId).ToList();
        }

        public List<HotelPitanja> GetNeodgovorenaPitanjaZaHotel(int hotelId)
        {
            return HotelPitanjaRepository.GetAll().Where(p => p.HotelId == hotelId && p.Odgovoreno == false).ToList();
        }

        public List<HotelPitanja> GetOdgovorenaPitanjaZaHotel(int hotelId)
        {
            return HotelPitanjaRepository.GetAll().Where(p => p.HotelId == hotelId && p.Odgovoreno == true).ToList();
        }

        public List<HotelPitanja> GetPitanjaZaGosta(int gostId)
        {
            return HotelPitanjaRepository.GetAll().Where(p => p.GostId==gostId).ToList();
        }

        public void Update(HotelPitanja pitanje)
        {
            HotelPitanjaRepository.Update(pitanje);
        }
    }
}

