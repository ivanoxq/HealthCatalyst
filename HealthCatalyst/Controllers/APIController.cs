using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HealthCatalyst.Controllers
{
    [ApiController]
    public class APIController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public APIController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpPost]
        [Route("api/API/GetCatUrlImage")]
        public async Task<string> GetCatUrlImage([FromBody] string url)
        {
            var client = _httpClientFactory.CreateClient();
            var result = await client.GetStreamAsync(url);
            return ConvertToBase64(result);
        }

        [HttpPost]
        [Route("api/API/GetCatPhoto")]
        public Task<string> GetCatPhoto([FromBody] string url)
        {
            var client = _httpClientFactory.CreateClient();
            var result = client.GetStringAsync(url);
            return result;
        }

        [HttpPost]
        [Route("api/API/GetRandomProfile")]
        public async Task<string> GetRandomProfile([FromBody] string url)
        {
            string jsonInString = "";
            var client = _httpClientFactory.CreateClient();
            var result = await client.PostAsync(url, new StringContent(jsonInString, System.Text.Encoding.UTF8, "application/json"));
            return await result.Content.ReadAsStringAsync();
        }

        public static string ConvertToBase64(Stream stream)
        {
            byte[] bytes;
            using (var memoryStream = new MemoryStream())
            {
                stream.CopyTo(memoryStream);
                bytes = memoryStream.ToArray();
            }

            string base64 = Convert.ToBase64String(bytes);

            return base64;
        }
    }
}