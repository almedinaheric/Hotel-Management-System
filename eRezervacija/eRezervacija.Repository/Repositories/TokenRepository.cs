using eRezervacija.Core.Autentikacija;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eRezervacija.Repository.Repositories
{
	public interface ITokenRepository : IRepository<AutentifikacijaToken>
	{
		public List<AutentifikacijaToken> GetAll();
	}

	public class TokenRepository : Repository<AutentifikacijaToken>, ITokenRepository
	{
        public TokenRepository(eRezervacijaDbContext dbContext) : base(dbContext)
        {
            
        }

		public List<AutentifikacijaToken> GetAll()
		{
			//return _dbContext.AutentifikacijaTokeni.Include(at => at.gost).Include(at => at.vlasnik).Include(at => at.admin).ToList();
			return _dbContext.AutentifikacijaTokeni.ToList();
		}
	}
}

