using eRezervacija.Core;
using eRezervacija.Core.ViewModels;
using eRezervacija.Repository;
using eRezervacija.Repository.Repositories;

namespace eRezervacija.Service
{
    public interface IRecenzijaService
    {
        void Add(Recenzija obj);
        IEnumerable<Recenzija> GetAll();
        List<RecenzijaReturnVM> GetByGostId(int gostId);
        List<RecenzijaByHotelReturnVM> GetByHotelId(int hotelId);
        void RemoveByHotelId(int hotelId);
        IEnumerable<Recenzija> GetSveByHotelId(int id);

    }
    public class RecenzijaService : IRecenzijaService
    {
        //IRepository<Recenzija> recenzijaRepository;
        IRecenzijaRepository recenzijaRepository;
        public RecenzijaService(IRecenzijaRepository recenzijaRepository)
        {
            this.recenzijaRepository = recenzijaRepository;
        }
        public void Add(Recenzija obj)
        {
            recenzijaRepository.Add(obj);
        }

        public IEnumerable<Recenzija> GetAll()
        {
            return recenzijaRepository.GetAll();
        }

        public List<RecenzijaReturnVM> GetByGostId(int gostId)
        {
            var listaRecenzijaRaw=recenzijaRepository.GetByGostId(gostId);
            var listaRecenzijaReturn = new List<RecenzijaReturnVM>();
            for (int i = 0; i < listaRecenzijaRaw.Count; i++)
            {
                var recenzijaMap = new RecenzijaReturnVM()
                {
                    HotelNaziv = listaRecenzijaRaw[i].hotel.Naziv,
                    Ocjena = listaRecenzijaRaw[i].Ocjena,
                    Komentar = listaRecenzijaRaw[i].Komentar
                };
                listaRecenzijaReturn.Add(recenzijaMap);
            }
            return listaRecenzijaReturn;
        }

        public List<RecenzijaByHotelReturnVM> GetByHotelId(int hotelId)
        {
            var listaRecenzijaRaw = recenzijaRepository.GetByHotelId(hotelId);
            var listaRecenzijaReturn = new List<RecenzijaByHotelReturnVM>();
            for(int i = 0; i < listaRecenzijaRaw.Count; i++)
            {
                var recenzijaMap = new RecenzijaByHotelReturnVM()
                {
                    HotelNaziv = listaRecenzijaRaw[i].hotel.Naziv,
                    OsobaIme = listaRecenzijaRaw[i].gost.korisnik.Ime+" " + listaRecenzijaRaw[i].gost.korisnik.Prezime,
                    Ocjena = listaRecenzijaRaw[i].Ocjena,
                    Komentar = listaRecenzijaRaw[i].Komentar
                };
                listaRecenzijaReturn.Add(recenzijaMap);
            }
            return listaRecenzijaReturn;
        }

        public IEnumerable<Recenzija> GetSveByHotelId(int hotelId)
        {
            return recenzijaRepository.GetAll().Where(x => x.HotelId == hotelId);
        }

        public void RemoveByHotelId(int hotelId)
        {
            var sveRecenzije = GetSveByHotelId(hotelId);
            recenzijaRepository.RemoveRange(sveRecenzije);
        }
    }
}
