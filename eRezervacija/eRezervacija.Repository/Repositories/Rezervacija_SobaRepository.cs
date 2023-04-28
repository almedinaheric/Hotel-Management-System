using eRezervacija.Core;
using Microsoft.EntityFrameworkCore;

namespace eRezervacija.Repository.Repositories
{
	public class Rezervacija_SobaRepository : Repository<RezervacijaSoba>, IRezervacija_SobaRepository
	{
		public Rezervacija_SobaRepository(eRezervacijaDbContext dbContext):base(dbContext)
		{
			
		}
		public List<RezervacijaSoba> GetAllWithInclude()
		{
			return _dbContext.RezervacijaSobe.Include(rs => rs.soba).ToList();
		}
	}

	public interface IRezervacija_SobaRepository: IRepository<RezervacijaSoba>
	{
		List<RezervacijaSoba> GetAllWithInclude();
	}
}
