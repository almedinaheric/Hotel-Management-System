using System;
using eRezervacija.Core;
using eRezervacija.Repository;
using eRezervacija.Repository.Repositories;

namespace eRezervacija.Service
{
    public interface INacinPlacanjaService
    {
        void Add(Core.NacinPlacanja obj);
        IEnumerable<Core.NacinPlacanja> GetAll();
        Core.NacinPlacanja GetByNacinPlacanjaId(int id);
        void Remove(Core.NacinPlacanja obj);
    }

   public class NacinPlacanjaService : INacinPlacanjaService
   {
       IRepository<Core.NacinPlacanja> nacinPlacanjaRepository;

       public NacinPlacanjaService (IRepository<Core.NacinPlacanja> nacinPlacanjaRepository)
       {
           this.nacinPlacanjaRepository = nacinPlacanjaRepository;
       }

       public void Add(Core.NacinPlacanja obj)
       {
           nacinPlacanjaRepository.Add(obj);
       }

       public IEnumerable<Core.NacinPlacanja> GetAll()
       {
           return nacinPlacanjaRepository.GetAll();
       }

        public Core.NacinPlacanja GetByNacinPlacanjaId(int id)
        {
            return nacinPlacanjaRepository.GetAll().Where(x => x.Id == id).FirstOrDefault();
        }

        public void Remove(Core.NacinPlacanja obj)
        {
            nacinPlacanjaRepository.Remove(obj);
        }

    }
    
}

