using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eRezervacija.Repository
{
	public interface IRepository<TEntity>
	{
		void Add(TEntity obj);
		void Update(TEntity obj);
		void Remove(TEntity obj);
        void RemoveById(int id);
        IEnumerable<TEntity> GetAll();
		TEntity Find(int id);
		void RemoveRange(IEnumerable<TEntity> entities);
    }
	public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
	{
		protected eRezervacijaDbContext _dbContext;
		DbSet<TEntity> dbset;
		public Repository(eRezervacijaDbContext db)
		{
			_dbContext = db;
			dbset = _dbContext.Set<TEntity>();
		}

		public void Add(TEntity obj)
		{
			_dbContext.Add(obj);
			_dbContext.SaveChanges();
		}

		public IEnumerable<TEntity> GetAll()
		{
			return dbset.AsEnumerable();
		}
        public void Remove(TEntity obj)
		{
            _dbContext.Remove(obj);
			_dbContext.SaveChanges();
		}

        public void RemoveById(int id)
        {
            TEntity obj = Find(id);

            if (obj != null)
            {
                Remove(obj);
            }
        }

        public void Update(TEntity obj)
		{
			//_dbContext.ChangeTracker.Clear(); //izbrisati ako ikako bude problema sa update, upitna linija koda
			_dbContext.Entry(obj).State = EntityState.Modified;
			_dbContext.SaveChanges();
		}

		public TEntity Find(int id)
		{
			return dbset.Find(id);
		}

        public void RemoveRange(IEnumerable<TEntity> entities)
        {
            _dbContext.RemoveRange(entities);
        }
    }
}
