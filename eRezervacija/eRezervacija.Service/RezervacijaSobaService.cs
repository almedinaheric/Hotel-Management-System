using eRezervacija.Core;
using eRezervacija.Repository;
using eRezervacija.Repository.Repositories;

namespace eRezervacija.Service
{
    public interface IRezervacijaSobaService
    {
        void Add(RezervacijaSoba obj);
        IEnumerable<RezervacijaSoba> GetAll();
        IEnumerable<RezervacijaSoba> GetByRezervacijaId(int rezervacijaId);
        Soba GetSobaFromRezervacijaId(int rezervacijaId);
    }
    public class RezervacijaSobaService: IRezervacijaSobaService
    {
        //IRepository<RezervacijaSoba> rezervacijaSobaRepository;
        IRezervacija_SobaRepository rezervacijaSobaRepository;
        public RezervacijaSobaService(IRezervacija_SobaRepository rezervacijaSobaRepository)
        {
            this.rezervacijaSobaRepository = rezervacijaSobaRepository;
        }
        public void Add(RezervacijaSoba obj)
        {
            rezervacijaSobaRepository.Add(obj);
        }

        public IEnumerable<RezervacijaSoba> GetAll()
        {
            return rezervacijaSobaRepository.GetAll();
        }

        public IEnumerable<RezervacijaSoba> GetByRezervacijaId(int rezervacijaId)
        {
            return rezervacijaSobaRepository.GetAll().Where(rs => rs.RezervacijaID == rezervacijaId);
        }

        public Soba GetSobaFromRezervacijaId(int rezervacijaId)
        {
            return rezervacijaSobaRepository.GetAllWithInclude().Where(rs => rs.RezervacijaID == rezervacijaId).FirstOrDefault().soba;
        }
    }
}
