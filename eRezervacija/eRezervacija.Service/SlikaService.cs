using System;
using eRezervacija.Core;
using eRezervacija.Repository;
using Microsoft.EntityFrameworkCore;

namespace eRezervacija.Service
{
    public interface ISlikaService
    {
        void Add(Slika obj);
        IEnumerable<Slika> GetAll();
        Slika GetBySlikaID(int id);
        IEnumerable<Slika> GetBySobaId(int id);
        void Remove(Slika obj);
        void RemoveBySlikaId(int id);
        void RemoveBySobaId(int sobaId);
        IEnumerable<Slika> GetByHotelId(int id);
        void RemoveByHotelId(int sobaId);
    }

    public class SlikaService : ISlikaService
    {
        IRepository<Slika> slikaRepository;

        public SlikaService(IRepository<Slika> slikaRepository)
        {
            this.slikaRepository = slikaRepository;
        }

        public void Add(Slika obj)
        {
            slikaRepository.Add(obj);
        }

        public IEnumerable<Slika> GetAll()
        {
            return slikaRepository.GetAll();
        }

        public Slika GetBySlikaID(int id)
        {
            return slikaRepository.GetAll().Where(x => x.Id == id).FirstOrDefault();
        }

        public IEnumerable<Slika> GetBySobaId(int sobaId)
        {
            return slikaRepository.GetAll().Where(x => x.SobaID == sobaId).ToList();
        }

        public void Remove(Slika obj)
        {
            slikaRepository.Remove(obj);
        }

        public void RemoveBySlikaId(int id)
        {
            slikaRepository.RemoveById(id);
        }

        public void RemoveBySobaId(int sobaId)
        {
            var sveSlike = GetBySobaId(sobaId);
            slikaRepository.RemoveRange(sveSlike);
        }

        public IEnumerable<Slika> GetByHotelId(int hotelId)
        {
            return slikaRepository.GetAll().Where(x => x.HotelID == hotelId).ToList();
        }

        public void RemoveByHotelId(int hotelId)
        {
            var sveSlike = GetByHotelId(hotelId);
            slikaRepository.RemoveRange(sveSlike);
        }

    }
}

