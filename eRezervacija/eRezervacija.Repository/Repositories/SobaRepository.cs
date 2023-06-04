using eRezervacija.Core;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eRezervacija.Repository.Repositories
{
	public class SobaRepository : Repository<Soba>, ISobaRepository
	{
		public SobaRepository(eRezervacijaDbContext dbcontext) : base(dbcontext)
		{
		}

		public IEnumerable<Soba> GetAllWithInclude()
		{
			return _dbContext.Sobe.Include(s=>s.sobaDetalji);
		}

		public Soba GetById(int id)
		{
			return _dbContext.Sobe.Where(g => g.Id == id).Include(g => g.sobaDetalji).FirstOrDefault();
		}

	}
	public interface ISobaRepository : IRepository<Soba>
	{
		IEnumerable<Soba> GetAllWithInclude();
		Soba GetById(int id);
	}
}
