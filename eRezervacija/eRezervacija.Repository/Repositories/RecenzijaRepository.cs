using eRezervacija.Core;
using Microsoft.EntityFrameworkCore;

namespace eRezervacija.Repository.Repositories
{
	public class RecenzijaRepository : Repository<Recenzija>, IRecenzijaRepository
	{
		public RecenzijaRepository(eRezervacijaDbContext dbcontext) : base(dbcontext)
		{
		}

		public List<Recenzija> GetByGostId(int id)
		{
			return _dbContext.Recenzije.Where(r => r.GostId == id).Include(r => r.hotel).ToList();
		}

        public List<Recenzija> GetByHotelId(int id)
        {
            return _dbContext.Recenzije.Where(r => r.HotelId == id).Include(r => r.gost).ThenInclude(k=>k.korisnik).Include(h=>h.hotel).ToList();
        }
    }
	public interface IRecenzijaRepository : IRepository<Recenzija>
	{
		List<Recenzija> GetByGostId(int id);
        List<Recenzija> GetByHotelId(int id);
    }
}
