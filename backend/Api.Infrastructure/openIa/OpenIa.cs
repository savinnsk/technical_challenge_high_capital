using System.Net.Http.Headers;
using System.Text;
using Api.Domain.Dto;


namespace Api.Infrastructure.OpenIa
{
    public class OpenAIService
    {
        private readonly HttpClient _httpClient;

        public OpenAIService(string apiKey)
        {
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri("https://api.openai.com/");
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
        }

        public async Task<string> GetResponseAsync(string prompt)
        {
            var requestBody = new
            {
                model = "gpt-4.1",
                input = prompt
            };
            var json = System.Text.Json.JsonSerializer.Serialize(requestBody);

            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("v1/responses", content);
            Console.WriteLine(response.Content.ReadAsStringAsync());

            response.EnsureSuccessStatusCode();

            var responseContent = await response.Content.ReadAsStringAsync();


            var gptResponse = System.Text.Json.JsonSerializer.Deserialize<GptResponse>(responseContent);

            return gptResponse?.output?.FirstOrDefault()?.content?.FirstOrDefault()?.text ?? "Sem resposta";
          
        }
    }
}