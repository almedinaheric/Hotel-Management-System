using eRezervacija.Core;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eRezervacija.Repository.Repositories
{
	public class GostRepository : Repository<Gost>, IGostRepository
	{
		public GostRepository(eRezervacijaDbContext dbcontext) : base(dbcontext)
		{
		}

		public Gost GetById(int id)
		{
			return _dbContext.Gosti.Where(g => g.KorisnikID == id).Include(g => g.kartica).FirstOrDefault();
		}
	}
	public interface IGostRepository : IRepository<Gost>
	{
		Gost GetById(int id);
	}
}
