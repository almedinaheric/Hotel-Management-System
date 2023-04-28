using eRezervacija.Core;
using eRezervacija.Repository;

namespace eRezervacija.Service
{
    public interface IVlasnikService
    {
        void Add(Vlasnik obj);
        IEnumerable<Vlasnik> GetAll();
		Vlasnik GetByKorisnikID(int id);
        void UpdateVlasnik(Vlasnik obj);
        Vlasnik GetByVlasnikId(int vlasnikId);
	}
	public class VlasnikService : IVlasnikService
    {
        IRepository<Vlasnik> vlasnikRepository;
        public VlasnikService(IRepository<Vlasnik> vlasnikRepository)
        {
            this.vlasnikRepository = vlasnikRepository;
        }
        public void Add(Vlasnik obj)
        {
            vlasnikRepository.Add(obj);
        }

        public IEnumerable<Vlasnik> GetAll()
        {
            return vlasnikRepository.GetAll();
        }

        public Vlasnik GetByKorisnikID(int id)
        {
			return vlasnikRepository.GetAll().Where(k => k.KorisnikID == id).FirstOrDefault();
        }

        public Vlasnik GetByVlasnikId(int vlasnikId)
        {
            return vlasnikRepository.GetAll().Where(x => x.Id == vlasnikId).FirstOrDefault();
        }

        public void UpdateVlasnik(Vlasnik obj)
        {
            vlasnikRepository.Update(obj);
        }
    }
}
