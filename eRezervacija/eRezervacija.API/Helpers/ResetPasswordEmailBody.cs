using System;
namespace eRezervacija.API.Helpers
{
	public class ResetPasswordEmailBody
	{
        public static string EmailBody(string resetPasswordUrl, string ime, string prezime)
        {
            return $"<p>Postovani/na {ime +" "+ prezime},</p>" +
                   "<p>Kliknite na link ispod kako biste resetovali Vas password</p>" +
                   $"<h3><a target='_blank' href='{resetPasswordUrl}'>{resetPasswordUrl}</a></h3>"+
                   $"{DateTime.Now}"; ;
        }

    }
}

