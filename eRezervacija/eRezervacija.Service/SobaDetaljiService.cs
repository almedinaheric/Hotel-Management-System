using System;
using eRezervacija.Core;
using eRezervacija.Repository;

namespace eRezervacija.Service
{
    public interface ISobaDetaljiService
    {
        void Add(SobaDetalji obj);
        IEnumerable<SobaDetalji> GetAll();
        SobaDetalji GetBySobaDetaljiID(int id);
        void Remove(SobaDetalji obj);
    }

    public class SobaDetaljiService : ISobaDetaljiService
    {
        IRepository<SobaDetalji> sobaDetaljiRepository;

        public SobaDetaljiService(IRepository<SobaDetalji> sobaDetaljiRepository)
        {
            this.sobaDetaljiRepository = sobaDetaljiRepository;
        }

        public void Add(SobaDetalji obj)
        {
            sobaDetaljiRepository.Add(obj);
        }

        public IEnumerable<SobaDetalji> GetAll()
        {
            return sobaDetaljiRepository.GetAll();
        }

        public SobaDetalji GetBySobaDetaljiID(int id)
        {
            return sobaDetaljiRepository.GetAll().Where(x => x.Id == id).FirstOrDefault();
        }

        public void Remove(SobaDetalji obj)
        {
            sobaDetaljiRepository.Remove(obj);
        }
    }
}

