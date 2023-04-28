using System;
using Microsoft.AspNetCore.Mvc;
using eRezervacija.API.Helpers;
using eRezervacija.API.ViewModels;
using eRezervacija.Core;
using eRezervacija.Service;
using Microsoft.AspNetCore.Http;
using eRezervacija.Repository;
using eRezervacija.Core.Autentikacija;

namespace eRezervacija.API.Controllers
{

    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SobaController : ControllerBase
    {
        ISobaDetaljiService sobaDetaljiService;
        ISobaService sobaService;
        ISlikaService slikaService;

        public SobaController(ISobaService sobaService, ISobaDetaljiService sobaDetaljiService,ISlikaService slikaService)
        {
            this.sobaDetaljiService = sobaDetaljiService;
            this.sobaService = sobaService;
            this.slikaService = slikaService;
        }

        
        [HttpPost]
        public Soba AddSoba(SobaVM soba)
        {
            var novaSoba = new Soba()
            {
                Naziv=soba.Naziv,
                Opis = soba.Opis,
                HotelID = soba.HotelID,
                SobaDetaljiID = soba.SobaDetaljiID,
                Kapacitet = soba.Kapacitet,
                BrojKreveta = soba.BrojKreveta,
                BrojKrevetaZaJednuOsobu = soba.BrojKrevetaZaJednuOsobu,
                BrojKrevetaNaSprat = soba.BrojKrevetaNaSprat,
                BrojBracnihKreveta = soba.BrojBracnihKreveta,
                MogucnostDodavanjaDjecijegKreveta = soba.MogucnostDodavanjaDjecijegKreveta,
                UkupnaCijena = soba.UkupnaCijena
            };
            sobaService.Add(novaSoba);
            return novaSoba;
        }

        [HttpGet]
        public IEnumerable<Soba> GetAllSoba()
        {
            return sobaService.GetAll();
        }


        [HttpPost]
        public SobaDetalji AddSobaDetalji (SobaDetaljiVM detalji)
        {
            var noviDetalji = new SobaDetalji()
            {
                Tv = detalji.Tv,
                WiFi = detalji.WiFi,
                Kuhinja = detalji.Kuhinja,
                DozvoljenoPusenje = detalji.DozvoljenoPusenje,
                KucniLjubimci = detalji.KucniLjubimci,
                PrilagodjenoZaDjecu = detalji.PrilagodjenoZaDjecu,
                Fen = detalji.Fen,
                Pegla = detalji.Pegla,
                DodatniJastuci = detalji.DodatniJastuci,
                Mikrovalna = detalji.Mikrovalna,
                KafeAparat = detalji.KafeAparat,
                Kuhalo = detalji.Kuhalo,
                OcistitiPrijeOdlaska = detalji.OcistitiPrijeOdlaska,
                Kupatilo = detalji.Kupatilo,
                Klima = detalji.Klima,
                Grijanje = detalji.Grijanje,
                Balkon = detalji.Balkon
            };
            sobaDetaljiService.Add(noviDetalji);
            return noviDetalji;
        }

        [HttpGet]
        public IEnumerable<SobaDetalji> GetAllSobaDetalji()
        {
            return sobaDetaljiService.GetAll();
        }


        [HttpGet("{hotelId}")]
        public IEnumerable<Soba> GetSobaByHotelId(int hotelId)
        {
            return sobaService.GetByHotelId(hotelId);
        }

        [HttpDelete("{id}")]
        public Soba DeleteSobaById(int id)
        {
            var obrisana = sobaService.GetBySobaID(id);
            var sveSlike = slikaService.GetBySobaId(id);
            if(sveSlike!=null)
            {
                slikaService.RemoveBySobaId(id);
            }
            sobaService.RemoveBySobaId(id);
            return obrisana;
        }
    }
}
