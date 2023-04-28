using eRezervacija.Core;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eRezervacija.Repository.Repositories
{
	public class HotelRepository : Repository<Hotel>, IHotelRepository
	{
		public HotelRepository(eRezervacijaDbContext dbContext) : base(dbContext)
		{

		}
		public IQueryable<Hotel> GetForSearch()
		{
			return _dbContext.Hoteli.Include(h => h.grad).Where(h=>h.Unlisted==false);
		}
	}
	public interface IHotelRepository : IRepository<Hotel>
	{
		IQueryable<Hotel> GetForSearch();
	}
}
